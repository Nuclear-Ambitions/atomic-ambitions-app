import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    console.log("Auth status check - session:", session);

    if (!session?.user) {
      console.log("No session or user found");
      return NextResponse.json(
        {
          isSignedIn: false,
          user: null
        },
        { status: 200 }
      );
    }

    console.log("User found in session:", session.user);

    return NextResponse.json({
      isSignedIn: true,
      user: {
        id: session.user.id || session.user.email,
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Error checking auth status:", error);
    return NextResponse.json(
      {
        isSignedIn: false,
        user: null,
        error: "Failed to check authentication status"
      },
      { status: 500 }
    );
  }
}
