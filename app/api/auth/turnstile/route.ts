import { NextRequest, NextResponse } from "next/server";

async function verifyTurnstile(token: string): Promise<boolean> {
  console.log("🔐 [TURNSTILE DEBUG] Starting Turnstile verification");
  console.log("🔐 [TURNSTILE DEBUG] Token length:", token?.length || 0);
  console.log("🔐 [TURNSTILE DEBUG] Has secret key:", !!process.env.TURNSTILE_SECRET_KEY);
  console.log("🔐 [TURNSTILE DEBUG] Environment:", process.env.NODE_ENV);

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`
    });

    console.log("🔐 [TURNSTILE DEBUG] Turnstile API response status:", response.status);
    console.log("🔐 [TURNSTILE DEBUG] Turnstile API response headers:", Object.fromEntries(response.headers.entries()));

    const result = await response.json() as { success: boolean };
    console.log("🔐 [TURNSTILE DEBUG] Turnstile API result:", result);

    return result.success;
  } catch (error) {
    console.error("🔐 [TURNSTILE DEBUG] Error verifying Turnstile token:", error);
    console.error("🔐 [TURNSTILE DEBUG] Error stack:", error instanceof Error ? error.stack : 'No stack trace');
    return false;
  }
}

export async function POST(request: NextRequest) {
  console.log("🔐 [TURNSTILE DEBUG] POST request received");
  console.log("🔐 [TURNSTILE DEBUG] Request URL:", request.url);
  console.log("🔐 [TURNSTILE DEBUG] Request headers:", Object.fromEntries(request.headers.entries()));

  try {
    const body = await request.json() as { token: string };
    console.log("🔐 [TURNSTILE DEBUG] Request body:", { hasToken: !!body.token, tokenLength: body.token?.length || 0 });

    const { token } = body;
    const isValidToken = await verifyTurnstile(token);

    console.log("🔐 [TURNSTILE DEBUG] Verification result:", isValidToken);

    return NextResponse.json({
      isValidToken,
      debug: {
        tokenLength: token?.length || 0,
        hasSecretKey: !!process.env.TURNSTILE_SECRET_KEY,
        environment: process.env.NODE_ENV
      }
    });
  } catch (error) {
    console.error("🔐 [TURNSTILE DEBUG] Error in POST handler:", error);
    console.error("🔐 [TURNSTILE DEBUG] Error stack:", error instanceof Error ? error.stack : 'No stack trace');

    return NextResponse.json({
      isValidToken: false,
      error: "Failed to verify Turnstile token",
      debug: {
        errorType: typeof error,
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      }
    }, { status: 500 });
  }
}
