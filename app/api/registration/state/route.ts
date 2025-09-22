import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import { RegistrationData } from "@/app/(main)/join/registration/types";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "No session found" },
        { status: 401 }
      );
    }

    // TODO: Replace this with actual database lookup
    // For now, return a mock registration state based on session
    const registrationState: Partial<RegistrationData> = {
      email: session.user.email,
      identityVerified: !!session.user.name,
      // Add other fields as needed based on your user model
    };

    return NextResponse.json(registrationState);
  } catch (error) {
    console.error("Error fetching registration state:", error);
    return NextResponse.json(
      { error: "Failed to fetch registration state" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "No session found" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const registrationData = body as Partial<RegistrationData>;

    // TODO: Save registration state to database
    // For now, just return success
    console.log("Saving registration state:", registrationData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving registration state:", error);
    return NextResponse.json(
      { error: "Failed to save registration state" },
      { status: 500 }
    );
  }
}
