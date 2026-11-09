import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import nodemailer from "nodemailer";

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
  const maxRequests = 10;

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

// 1. Admin Lead Alert HTML Template
function buildAdminNotificationEmailHtml(data: {
  name: string;
  email: string;
  company: string;
  scope: string;
  budget: string;
  ip: string;
  timestamp: string;
  ticketId: string;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead Notification // Aethrix Nexus Nova</title>
</head>
<body style="margin: 0; padding: 24px 0; background-color: #0a0805; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #f5f3ee;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0a0805; margin: 0 auto; padding: 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 620px; margin: 0 auto; background: linear-gradient(180deg, #18130b 0%, #100c07 100%); border: 1px solid rgba(255, 212, 38, 0.25); border-radius: 16px; overflow: hidden; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.8);" cellspacing="0" cellpadding="0">
          
          <!-- Top Accent Gold Line -->
          <tr>
            <td style="height: 3px; background: linear-gradient(90deg, #ffd426, #ff9f1c, #ffd426);"></td>
          </tr>

          <!-- Header with Brand Logo -->
          <tr>
            <td align="center" style="padding: 32px 24px 20px 24px; text-align: center;">
              <img src="cid:brand_logo" alt="Aethrix Nexus Nova" width="220" style="display: block; width: 220px; max-width: 90%; height: auto; margin: 0 auto 16px auto;" />
              <div style="display: inline-block; padding: 4px 12px; background-color: rgba(255, 212, 38, 0.1); border: 1px solid rgba(255, 212, 38, 0.3); border-radius: 9999px; font-family: monospace; font-size: 11px; font-weight: 700; color: #ffd426; text-transform: uppercase; letter-spacing: 0.1em;">
                Production Node // Lead Dispatch &bull; Ref: ${data.ticketId}
              </div>
            </td>
          </tr>

          <!-- Main Title -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <h1 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 700; color: #f5f3ee; letter-spacing: -0.02em; text-align: center;">
                New Project Consultation Request
              </h1>
              <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #b7ae9c; text-align: center;">
                An enterprise client submitted an architectural engagement inquiry via the portal.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 32px;">
              <div style="height: 1px; background-color: rgba(255, 255, 255, 0.08);"></div>
            </td>
          </tr>

          <!-- Lead Details Table -->
          <tr>
            <td style="padding: 24px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); width: 35%; font-family: monospace; font-size: 12px; color: #7d7566; text-transform: uppercase; letter-spacing: 0.05em;">
                    Contact Name
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 14px; font-weight: 600; color: #f5f3ee;">
                    ${data.name}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-family: monospace; font-size: 12px; color: #7d7566; text-transform: uppercase; letter-spacing: 0.05em;">
                    Client Email
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 14px; font-weight: 600;">
                    <a href="mailto:${data.email}" style="color: #ffd426; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-family: monospace; font-size: 12px; color: #7d7566; text-transform: uppercase; letter-spacing: 0.05em;">
                    Company / Entity
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 14px; color: #f5f3ee;">
                    ${data.company}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-family: monospace; font-size: 12px; color: #7d7566; text-transform: uppercase; letter-spacing: 0.05em;">
                    Target Budget
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 14px; font-weight: 700; color: #ffd426;">
                    ${data.budget}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-family: monospace; font-size: 12px; color: #7d7566; text-transform: uppercase; letter-spacing: 0.05em;">
                    Received At
                  </td>
                  <td style="padding: 10px 0; font-family: monospace; font-size: 12px; color: #b7ae9c;">
                    ${data.timestamp} &middot; IP: ${data.ip}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Scope Box -->
          <tr>
            <td style="padding: 0 32px 28px 32px;">
              <div style="font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #ffd426; margin-bottom: 8px; font-weight: 600;">
                Project Scope &amp; Architecture Brief
              </div>
              <div style="background-color: #0e0b07; border: 1px solid rgba(255, 255, 255, 0.08); border-left: 3px solid #ffd426; border-radius: 8px; padding: 16px; font-size: 13.5px; line-height: 1.6; color: #f5f3ee; white-space: pre-wrap;">${data.scope}</div>
            </td>
          </tr>

          <!-- Action Button -->
          <tr>
            <td align="center" style="padding: 0 32px 32px 32px;">
              <a href="mailto:${data.email}?subject=Re:%20Aethrix%20Nexus%20Nova%20Architecture%20Inquiry%20[Ref:%20${data.ticketId}]" style="display: inline-block; background-color: #ffd426; color: #1a1305; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 16px rgba(255, 212, 38, 0.35); text-transform: uppercase; font-family: monospace; letter-spacing: 0.05em;">
                Reply Directly to ${data.name} &rarr;
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0c0906; border-top: 1px solid rgba(255, 255, 255, 0.06); padding: 20px 32px; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 11px; font-family: monospace; color: #ffd426;">
                AETHRIX NEXUS NOVA &bull; ENTERPRISE IT PROTOCOL
              </p>
              <p style="margin: 0; font-size: 11px; color: #7d7566;">
                Global Presence: Dhanmondi, Dhaka &bull; Inquiries: mominrifat8@gmail.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// 2. Client Auto-Reply Confirmation Email HTML Template
function buildClientConfirmationEmailHtml(data: {
  name: string;
  company: string;
  scope: string;
  budget: string;
  ticketId: string;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consultation Inquiry Acknowledged // Aethrix Nexus Nova</title>
</head>
<body style="margin: 0; padding: 24px 0; background-color: #0a0805; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #f5f3ee;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0a0805; margin: 0 auto; padding: 0;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="100%" style="max-width: 620px; margin: 0 auto; background: linear-gradient(180deg, #18130b 0%, #100c07 100%); border: 1px solid rgba(255, 212, 38, 0.25); border-radius: 16px; overflow: hidden; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.8);" cellspacing="0" cellpadding="0">
          
          <!-- Top Accent Gold Line -->
          <tr>
            <td style="height: 3px; background: linear-gradient(90deg, #ffd426, #ff9f1c, #ffd426);"></td>
          </tr>

          <!-- Header with Brand Logo -->
          <tr>
            <td align="center" style="padding: 32px 24px 20px 24px; text-align: center;">
              <img src="cid:brand_logo" alt="Aethrix Nexus Nova" width="220" style="display: block; width: 220px; max-width: 90%; height: auto; margin: 0 auto 16px auto;" />
              <div style="display: inline-block; padding: 4px 14px; background-color: rgba(52, 211, 153, 0.1); border: 1px solid rgba(52, 211, 153, 0.3); border-radius: 9999px; font-family: monospace; font-size: 11px; font-weight: 700; color: #34d399; text-transform: uppercase; letter-spacing: 0.1em;">
                Inquiry Confirmed // Ticket: ${data.ticketId}
              </div>
            </td>
          </tr>

          <!-- Greeting & Confirmation -->
          <tr>
            <td style="padding: 0 32px 20px 32px;">
              <h1 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 700; color: #f5f3ee; letter-spacing: -0.02em;">
                Consultation Request Received, ${data.name}.
              </h1>
              <p style="margin: 0 0 12px 0; font-size: 14px; line-height: 1.6; color: #b7ae9c;">
                Thank you for initiating contact with <strong style="color: #ffd426;">Aethrix Nexus Nova</strong>. We have successfully logged your technical brief for <strong style="color: #f5f3ee;">${data.company}</strong>.
              </p>
              <p style="margin: 0; font-size: 13.5px; line-height: 1.6; color: #b7ae9c;">
                Our Principal Solution Architects are reviewing your concurrency limits, data invariants, and infrastructure targets.
              </p>
            </td>
          </tr>

          <!-- Guaranteed SLA Callout Box -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <div style="background-color: rgba(255, 212, 38, 0.05); border: 1px solid rgba(255, 212, 38, 0.2); border-radius: 10px; padding: 14px 18px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="vertical-align: top; width: 24px; font-size: 16px; color: #ffd426;">&#10003;</td>
                    <td style="font-size: 13px; line-height: 1.5; color: #f5f3ee;">
                      <strong style="color: #ffd426;">Guaranteed 24-Hour SLA Response:</strong> A senior architect will reach out directly to coordinate discovery blueprinting, mutual NDA execution, and technical milestone planning.
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Submitted Specification Summary -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <div style="font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #ffd426; margin-bottom: 8px; font-weight: 600;">
                Summary of Submitted Brief
              </div>
              <div style="background-color: #0e0b07; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #f5f3ee; line-height: 1.5;">
                <div style="margin-bottom: 6px;"><span style="color: #7d7566; font-family: monospace;">TARGET ENTITY:</span> ${data.company}</div>
                <div style="margin-bottom: 6px;"><span style="color: #7d7566; font-family: monospace;">BUDGET TIER:</span> <span style="color: #ffd426; font-weight: 600;">${data.budget}</span></div>
                <div><span style="color: #7d7566; font-family: monospace;">SCOPE BRIEF:</span> <span style="color: #b7ae9c;">${data.scope}</span></div>
              </div>
            </td>
          </tr>

          <!-- Direct Communication Hint -->
          <tr>
            <td style="padding: 0 32px 28px 32px; font-size: 12.5px; line-height: 1.6; color: #7d7566;">
              Need to append supplementary architecture diagrams, OpenAPI specifications, or mutual NDA drafts prior to our briefing? Simply reply directly to this email or reach us at <a href="mailto:mominrifat8@gmail.com" style="color: #ffd426; text-decoration: none;">mominrifat8@gmail.com</a>.
            </td>
          </tr>

          <!-- Footer Coordinates -->
          <tr>
            <td style="background-color: #0c0906; border-top: 1px solid rgba(255, 255, 255, 0.06); padding: 20px 32px; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 11px; font-family: monospace; color: #ffd426;">
                AETHRIX NEXUS NOVA &bull; ENTERPRISE IT PROTOCOL
              </p>
              <p style="margin: 0; font-size: 11px; color: #7d7566;">
                Global Presence: Dhanmondi, Dhaka &bull; Direct: mominrifat8@gmail.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
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

    const ticketId = `ANN-${Date.now().toString(36).toUpperCase()}`;

    const leadPayload = {
      timestamp: new Date().toISOString(),
      ticketId,
      name,
      email,
      company,
      scope,
      budget: budget || "Not specified",
      ipAddress: ip,
    };

    // 4. Send Email via Gmail SMTP
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "mominrifat8@gmail.com";
    const smtpUser = process.env.EMAIL_HOST_USER || "mominrifat8@gmail.com";
    const smtpPass = process.env.EMAIL_HOST_PASSWORD || "brgrrqybbnjolahl";
    const smtpHost = process.env.EMAIL_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.EMAIL_PORT) || 587;

    const adminHtml = buildAdminNotificationEmailHtml({
      name,
      email,
      company,
      scope,
      budget: leadPayload.budget,
      ip,
      timestamp: leadPayload.timestamp,
      ticketId,
    });

    const clientHtml = buildClientConfirmationEmailHtml({
      name,
      company,
      scope,
      budget: leadPayload.budget,
      ticketId,
    });

    let emailSent = false;

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: false, // Port 587 uses STARTTLS
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        // Inline brand logo attachment
        const logoPath = path.join(process.cwd(), "public", "brand-logo-v3.png");
        const attachments = [];

        if (existsSync(logoPath)) {
          attachments.push({
            filename: "brand-logo.png",
            path: logoPath,
            cid: "brand_logo", // Matches <img src="cid:brand_logo">
          });
        }

        // A. Send Lead Notification to Admin (Momin Rifat)
        await transporter.sendMail({
          from: `"Aethrix Nexus Nova" <${smtpUser}>`,
          to: adminEmail,
          replyTo: `"${name}" <${email}>`,
          subject: `[Lead Notification] ${name} from ${company} - Ref: ${ticketId}`,
          text: `New Lead:\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nBudget: ${leadPayload.budget}\nScope:\n${scope}\nReceived: ${leadPayload.timestamp}\nIP: ${ip}\nRef: ${ticketId}`,
          html: adminHtml,
          attachments,
        });

        // B. Send Instant Confirmation Receipt to Client
        if (email && email.includes("@")) {
          await transporter.sendMail({
            from: `"Aethrix Nexus Nova" <${smtpUser}>`,
            to: email,
            replyTo: adminEmail,
            subject: `Consultation Received // Aethrix Nexus Nova [Ref: ${ticketId}]`,
            text: `Dear ${name},\n\nThank you for reaching out to Aethrix Nexus Nova. We have received your technical brief for ${company}.\n\nGuaranteed 24-Hour SLA: Our senior solution architects are reviewing your specifications and will reach out within 24 hours.\n\nTicket Reference: ${ticketId}\nBudget: ${leadPayload.budget}\nScope: ${scope}\n\nCoordinates: Dhanmondi, Dhaka | Direct: mominrifat8@gmail.com`,
            html: clientHtml,
            attachments,
          });
        }

        emailSent = true;
      } catch (err) {
        console.error("Gmail SMTP Send Error:", err);
      }
    }

    // 5. Fallback: If Gmail SMTP failed or not configured, try Resend API if available
    if (!emailSent && process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Aethrix Nexus Nova <onboarding@resend.dev>",
            to: adminEmail,
            subject: `[Lead Notification] ${name} (${company}) [Ref: ${ticketId}]`,
            html: adminHtml,
          }),
        });
        emailSent = true;
      } catch (err) {
        console.error("Resend Fallback Error:", err);
      }
    }

    // 6. Optional: Forward to external Django backend if configured
    const djangoEndpoint = process.env.DJANGO_LEAD_ENDPOINT;
    const djangoToken = process.env.DJANGO_LEAD_TOKEN;

    if (djangoEndpoint) {
      try {
        await fetch(djangoEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(djangoToken ? { Authorization: `Bearer ${djangoToken}` } : {}),
          },
          body: JSON.stringify(leadPayload),
        });
      } catch {
        // Continue
      }
    }

    // 7. Local append to ensure zero data loss
    await appendLocalLead(leadPayload);

    return NextResponse.json({
      success: true,
      ticketId,
      message: "Consultation inquiry received. A confirmation receipt has been dispatched to your email.",
    });
  } catch (error) {
    console.error("Lead API Route Exception:", error);
    return NextResponse.json(
      { error: "Internal server error. Please email mominrifat8@gmail.com directly." },
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
