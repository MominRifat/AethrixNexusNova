import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

// Lead Validation Schema
const LeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(120),
  company: z.string().min(2, "Company name is required").max(120),
  scope: z.string().min(10, "Please provide brief details on your project scope").max(2000),
  budget: z.string().optional(),
  honeypot: z.string().optional(), // Bot trap: must be empty
});

// Simple in-memory rate limiting map: IP -> { count, resetTime }
const leadRateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes window
  const maxRequests = 5;

  const entry = leadRateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    leadRateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
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
    // 1. IP Rate Limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions from this connection. Please try again later." },
        { status: 429 }
      );
    }

    // 2. Body Parsing & Validation
    const rawBody = await req.json().catch(() => ({}));
    const parseResult = LeadSchema.safeParse(rawBody);

    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validation failed", details: fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, company, scope, budget, honeypot } = parseResult.data;

    // 3. Honeypot check: If filled, silently acknowledge to mislead bots
    if (honeypot && honeypot.trim().length > 0) {
      return NextResponse.json({ success: true, message: "Lead captured successfully" });
    }

    const leadPayload = {
      timestamp: new Date().toISOString(),
      name,
      email,
      company,
      scope,
      budget: budget || "Not specified",
      ipAddress: ip,
    };

    // 4. (a) If process.env.RESEND_API_KEY is configured, send email notification (100% free)
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.CONTACT_EMAIL || "mominrifat8@gmail.com";

    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Aethrix Nexus Nova <onboarding@resend.dev>",
            to: adminEmail,
            subject: `[New Lead] Project Inquiry from ${name} (${company})`,
            html: `
              <h2>New Project Consultation Lead</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Company:</strong> ${company}</p>
              <p><strong>Budget:</strong> ${budget || "Not specified"}</p>
              <p><strong>Scope:</strong></p>
              <p>${scope}</p>
              <p><em>Received at: ${leadPayload.timestamp} from IP: ${ip}</em></p>
            `,
          }),
        });
      } catch {
        // Fallback continues
      }
    }

    // 4. (b) If process.env.DJANGO_LEAD_ENDPOINT is configured, forward to Django
    const djangoEndpoint = process.env.DJANGO_LEAD_ENDPOINT;
    const djangoToken = process.env.DJANGO_LEAD_TOKEN;

    if (djangoEndpoint) {
      try {
        const djangoRes = await fetch(djangoEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(djangoToken ? { Authorization: `Bearer ${djangoToken}` } : {}),
          },
          body: JSON.stringify(leadPayload),
        });

        if (!djangoRes.ok) {
          throw new Error(`Django backend returned status ${djangoRes.status}`);
        }
      } catch {
        // If external forward fails, fallback to local dev log to ensure zero lead loss
        await appendLocalLead(leadPayload);
      }
    } else {
      // 4. (c) In development or standalone, append safely to leads.ndjson
      await appendLocalLead(leadPayload);
    }

    return NextResponse.json({
      success: true,
      message: "Consultation inquiry received. Our principal architects will reach out within 24 hours.",
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error. Please email consult@aethrixnexus.nova directly." },
      { status: 500 }
    );
  }
}

async function appendLocalLead(data: Record<string, unknown>) {
  try {
    const isVercel = Boolean(process.env.VERCEL);
    const filePath = isVercel
      ? path.join("/tmp", "leads.ndjson")
      : path.join(process.cwd(), "leads.ndjson");
    const line = JSON.stringify(data) + "\n";
    await fs.appendFile(filePath, line, "utf8");
  } catch {
    // Gracefully handle file write issues
  }
}
