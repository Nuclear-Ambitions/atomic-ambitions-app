import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { RegistrationData, MembershipLevel, SubscriptionStatus } from "@/(main)/join/registration/types";

export async function GET(request: NextRequest) {
  try {
    // For now, return dummy registration data
    // Later this will be fetched from the database based on user session/cookie
    const dummyRegistrationData: RegistrationData = {
      accountId: "dummy-account-id-123",
      identityVerified: true,
      alias: "TestUser",
      email: "test@example.com",
      termsAcceptedAt: new Date("2024-01-15T10:30:00Z"),
      turnstileToken: "",
      joinedAt: new Date("2024-01-15T10:30:00Z"),
      membershipLevel: MembershipLevel.Explorer,
      subscriptionStatus: SubscriptionStatus.Active,
      subscriptionExpiresAt: new Date("2024-12-31T23:59:59Z"),
    };

    return NextResponse.json(dummyRegistrationData, { status: 200 });
  } catch (error) {
    console.error("Error fetching registration data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
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
    if (!alias || !email) {
      return NextResponse.json(
        { message: "Missing required fields" },
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
