import { NextRequest, NextResponse } from "next/server";
import DOMPurify from "isomorphic-dompurify";

// Simple in-memory rate limiting to mitigate spam/DOS (10 requests per 10 minutes per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 10;

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

// Industry-standard XSS Sanitizer using DOMPurify: removes all dangerous script tags, event handlers, and payloads
function sanitizeInput(str: string): string {
  if (!str || typeof str !== "string") return "";
  return DOMPurify.sanitize(str, {
    ALLOWED_TAGS: [], // Strip all HTML markup
    ALLOWED_ATTR: [],
  }).trim();
}

// Validates email format strictly
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Ensure no CRLF (carriage return / line feed) to prevent email header injection
  return emailRegex.test(email) && !/[\r\n]/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "anonymous";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few minutes before submitting again." },
        { status: 429 }
      );
    }

    // 2. Parse and Validate Body
    const body = await req.json();
    const { fullName, email, purpose, message, honeypot } = body;

    // Honeypot check for spam bots
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Transmission received" });
    }

    // Required fields check
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !isValidEmail(email.trim())) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message content is required." }, { status: 400 });
    }

    // Validate string lengths to prevent buffer exhaustion / ReDoS
    if (fullName.length > 100) {
      return NextResponse.json({ error: "Name must be under 100 characters." }, { status: 400 });
    }

    if (email.length > 120) {
      return NextResponse.json({ error: "Email must be under 120 characters." }, { status: 400 });
    }

    if (message.length > 3000) {
      return NextResponse.json({ error: "Message must be under 3000 characters." }, { status: 400 });
    }

    // Prevent Header Injection: no newlines in name or purpose
    if (/[\r\n]/.test(fullName)) {
      return NextResponse.json({ error: "Invalid characters in full name." }, { status: 400 });
    }

    // Sanitize values using DOMPurify
    const sanitizedName = sanitizeInput(fullName);
    const sanitizedEmail = email.trim();
    const sanitizedPurpose = ["Freelance", "Job", "Other"].includes(purpose)
      ? purpose
      : "General";
    const sanitizedMessage = sanitizeInput(message);

    if (!sanitizedName) {
      return NextResponse.json(
        { error: "Full name contains invalid or unsafe characters." },
        { status: 400 }
      );
    }

    if (!sanitizedMessage) {
      return NextResponse.json(
        { error: "Message content contains invalid or unsafe characters." },
        { status: 400 }
      );
    }

    // 3. Dispatch to Google Apps Script (if configured)
    const googleScriptUrl =
      process.env.GOOGLE_SCRIPT_URL ||
      process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    if (googleScriptUrl) {
      try {
        const scriptRes = await fetch(googleScriptUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: sanitizedName,
            email: sanitizedEmail,
            purpose: sanitizedPurpose,
            message: sanitizedMessage,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!scriptRes.ok) {
          console.error("Google Script responded with error status:", scriptRes.status);
        }
      } catch (scriptErr) {
        console.error("Failed to forward payload to Google Apps Script:", scriptErr);
        // Continue and return success to user so client UX remains smooth
      }
    } else {
      console.log(
        "[Contact Form - Dev Mode] No GOOGLE_SCRIPT_URL configured in .env. Submission logged locally:",
        {
          name: sanitizedName,
          email: sanitizedEmail,
          purpose: sanitizedPurpose,
          message: sanitizedMessage,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Transmission received. Vikas will get back to you shortly.",
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
