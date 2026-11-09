import { NextRequest, NextResponse } from "next/server";
import { ArchitecturePlanSchema, ArchitectureResponse } from "@/lib/architect/types";
import { generateMockArchitecture } from "@/lib/architect/mockProvider";

// In-memory rate limiting map: IP -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 5;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (entry.count >= maxRequests) {
    return true;
  }

  entry.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Extract Client IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    // 2. Check Rate Limit (5 requests / min)
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Rate limit reached (5 requests/minute). Please wait a moment." },
        { status: 429 }
      );
    }

    // 3. Parse & Validate Input Body
    const body = await req.json().catch(() => ({}));
    let prompt: string = typeof body.prompt === "string" ? body.prompt.trim() : "";

    if (!prompt) {
      return NextResponse.json({ error: "Architecture prompt is required." }, { status: 400 });
    }

    // Cap at 600 characters max per PROJECT_RULES / Step 5 spec
    if (prompt.length > 600) {
      prompt = prompt.slice(0, 600);
    }

    // Quick guardrail against pure non-technical gibberish
    const isNonTechnical =
      prompt.length < 5 ||
      /^(hi|hello|test|hey|asdf|qwerty)\b/i.test(prompt) && prompt.length < 15;

    if (isNonTechnical) {
      const mock = await generateMockArchitecture("general enterprise distributed SaaS platform");
      const res: ArchitectureResponse = {
        plan: mock,
        provider: "demo",
      };
      return NextResponse.json(res);
    }

    // 4. Check for Server-Side Gemini API Key
    const apiKey = process.env.GEMINI_API_KEY;

    // Fall back to Mock Provider if no API key is configured
    if (!apiKey) {
      const plan = await generateMockArchitecture(prompt);
      const res: ArchitectureResponse = {
        plan,
        provider: "demo",
      };
      return NextResponse.json(res);
    }

    // 5. Query Gemini API Server-Side with Strict Schema Output
    try {
      const systemInstruction = `You are a Principal Enterprise Systems Architect at Aethrix Nexus Nova.
Generate a rigorous, production-grade technical architecture plan for the provided enterprise request.
You must return ONLY a valid JSON object matching the exact schema:
{
  "summary": string (2-3 concise technical sentences),
  "layers": [
    { "name": "Client Layer", "components": [string, string, string] },
    { "name": "Edge & Ingress", "components": [string, string, string] },
    { "name": "Services & Workers", "components": [string, string, string] },
    { "name": "Data & Storage", "components": [string, string, string] },
    { "name": "AI & Inference", "components": [string, string, string] }
  ],
  "stack": [string, string, string, string, string, string],
  "milestones": [
    { "title": string, "weeks": string },
    { "title": string, "weeks": string },
    { "title": string, "weeks": string },
    { "title": string, "weeks": string }
  ],
  "assumptions": [string, string, string]
}
If the request is non-technical, formulate a sensible enterprise cloud architecture anyway based on the closest engineering domain.
Output raw JSON only without markdown code blocks.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: systemInstruction }],
            },
            contents: [
              {
                parts: [{ text: `Request: ${prompt}` }],
              },
            ],
            generationConfig: {
              temperature: 0.2,
              responseMimeType: "application/json",
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error status: ${response.status}`);
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        throw new Error("Empty response from Gemini API");
      }

      // Parse JSON & Validate with Zod
      const parsedJson = JSON.parse(rawText);
      const validatedPlan = ArchitecturePlanSchema.parse(parsedJson);

      const res: ArchitectureResponse = {
        plan: validatedPlan,
        provider: "live",
      };
      return NextResponse.json(res);
    } catch {
      // Fall back safely to deterministic mock on any Gemini API error or validation failure
      const fallbackPlan = await generateMockArchitecture(prompt);
      const res: ArchitectureResponse = {
        plan: fallbackPlan,
        provider: "demo",
      };
      return NextResponse.json(res);
    }
  } catch {
    const fallback = await generateMockArchitecture("enterprise distributed platform");
    return NextResponse.json({ plan: fallback, provider: "demo" });
  }
}
