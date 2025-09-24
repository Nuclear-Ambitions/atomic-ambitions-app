import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@/auth";
import { RegistrationData, MembershipLevel, SubscriptionStatus } from "@/(main)/join/registration/types";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    // For now, return dummy registration data based on the authenticated user
    // Later this will be fetched from the database
    const registrationData: RegistrationData = {
      accountId: session.user.id || session.user.email || undefined,
      identityVerified: true, // If they're signed in, identity is verified
      alias: undefined,
      email: undefined,
      termsAcceptedAt: undefined,
      joinedAt: undefined,
      membershipLevel: undefined,
      subscriptionStatus: undefined,
      subscriptionExpiresAt: undefined,
    };

    return NextResponse.json(registrationData, { status: 200 });
  } catch (error) {
    console.error("Error fetching registration state:", error);
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
    } | Partial<RegistrationData>;

    // Check if this is a new user registration (has alias and email)
    if ('alias' in body && 'email' in body && body.alias && body.email) {
      // Handle new user registration (from /api/register)
      const { alias, email } = body;

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
    } else {
      // Handle registration state update (from original /api/registration)
      const session = await auth();

      if (!session?.user) {
        return NextResponse.json(
          { message: "Authentication required" },
          { status: 401 }
        );
      }

      // In a real application, you would save this to the database
      // For now, we'll just log the update
      console.log("Registration state update:", {
        userId: session.user.id || session.user.email,
        data: body,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        { message: "Registration state updated successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
