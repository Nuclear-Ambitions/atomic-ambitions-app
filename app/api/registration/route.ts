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
      termsAcceptedAt?: Date;
      privacyPolicyAcceptedAt?: Date;
    } | Partial<RegistrationData>;

    // Check if this is a membership creation request
    if ('alias' in body && 'termsAcceptedAt' in body && 'privacyPolicyAcceptedAt' in body) {
      // Handle membership creation
      const { alias, termsAcceptedAt, privacyPolicyAcceptedAt } = body;

      // Validate required fields
      if (!alias || !termsAcceptedAt || !privacyPolicyAcceptedAt) {
        return NextResponse.json(
          { message: "Missing required fields" },
          { status: 400 }
        );
      }

      // Get authenticated user
      const session = await auth();
      if (!session?.user?.id) {
        return NextResponse.json(
          { message: "Authentication required" },
          { status: 401 }
        );
      }

      const userId = session.user.id;

      // In a real application, you would:
      // 1. Update users table with alias
      // 2. Insert membership record

      // For now, we'll just log the membership creation
      console.log("Membership creation:", {
        userId,
        alias,
        termsAcceptedAt,
        privacyPolicyAcceptedAt,
        level: "Explorer",
        status: "active",
        joinedAt: new Date().toISOString(),
        timestamp: new Date().toISOString(),
      });

      // Generate membership ID (in real app, this would be the database ID)
      const membershipId = uuidv4();

      return NextResponse.json(
        {
          message: "Membership created successfully",
          membershipId,
        },
        { status: 200 }
      );
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
