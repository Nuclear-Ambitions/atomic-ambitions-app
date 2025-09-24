import { NextRequest, NextResponse } from "next/server";
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
      alias: session.user.name || session.user.email?.split('@')[0] || "User",
      email: session.user.email || "",
      termsAcceptedAt: new Date("2024-01-15T10:30:00Z"),
      turnstileToken: "",
      joinedAt: new Date("2024-01-15T10:30:00Z"),
      membershipLevel: MembershipLevel.Explorer,
      subscriptionStatus: SubscriptionStatus.Active,
      subscriptionExpiresAt: new Date("2024-12-31T23:59:59Z"),
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
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json() as Partial<RegistrationData>;

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
  } catch (error) {
    console.error("Error updating registration state:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
