import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// This would typically be replaced with actual Turnstile verification
async function verifyTurnstile(token: string): Promise<boolean> {
  // For now, we'll just return true
  // In production, you would verify the token with Cloudflare
  // const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //   body: `secret=${process.env.TURNSTILE_SECRET}&response=${token}`
  // });
  // const result = await response.json();
  // return result.success;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      alias?: string;
      email?: string;
      turnstileToken?: string;
    };
    const { alias, email, turnstileToken } = body;

    // Validate required fields
    if (!alias || !email || !turnstileToken) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify Turnstile token
    const isValidToken = await verifyTurnstile(turnstileToken);
    if (!isValidToken) {
      return NextResponse.json(
        { message: "Invalid verification token" },
        { status: 400 }
      );
    }

    // Generate UUID for the user
    const userId = uuidv4();

    // In a real application, you would:
    // 1. Save user data to database
    // 2. Send verification email
    // 3. Handle any business logic

    // For now, we'll just log the registration
    console.log("New user registration:", {
      userId,
      alias,
      email,
      timestamp: new Date().toISOString(),
    });

    // Create response with cookie
    const response = NextResponse.json(
      {
        message: "Registration successful",
        userId,
        emailSent: true
      },
      { status: 200 }
    );

    // Set cookie with user ID
    response.cookies.set("user-id", userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
