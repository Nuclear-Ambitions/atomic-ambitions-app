import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  console.log("🔐 [AUTH STATUS DEBUG] GET request received");
  console.log("🔐 [AUTH STATUS DEBUG] Request URL:", request.url);
  console.log("🔐 [AUTH STATUS DEBUG] Request headers:", Object.fromEntries(request.headers.entries()));
  console.log("🔐 [AUTH STATUS DEBUG] Environment:", process.env.NODE_ENV);

  try {
    console.log("🔐 [AUTH STATUS DEBUG] Calling auth() function...");
    const session = await auth();
    console.log("🔐 [AUTH STATUS DEBUG] Auth function completed");
    console.log("🔐 [AUTH STATUS DEBUG] Session object:", session);
    console.log("🔐 [AUTH STATUS DEBUG] Session type:", typeof session);
    console.log("🔐 [AUTH STATUS DEBUG] Session keys:", session ? Object.keys(session) : 'null');

    if (!session?.user) {
      console.log("🔐 [AUTH STATUS DEBUG] No session or user found");
      console.log("🔐 [AUTH STATUS DEBUG] Session exists:", !!session);
      console.log("🔐 [AUTH STATUS DEBUG] User exists:", !!session?.user);
      return NextResponse.json(
        {
          isSignedIn: false,
          user: null,
          debug: {
            sessionExists: !!session,
            userExists: !!session?.user,
            sessionKeys: session ? Object.keys(session) : []
          }
        },
        { status: 200 }
      );
    }

    console.log("🔐 [AUTH STATUS DEBUG] User found in session:", session.user);
    console.log("🔐 [AUTH STATUS DEBUG] User keys:", Object.keys(session.user));

    return NextResponse.json({
      isSignedIn: true,
      user: {
        id: session.user.id || session.user.email,
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
      },
      debug: {
        sessionKeys: Object.keys(session),
        userKeys: Object.keys(session.user),
        hasId: !!session.user.id,
        hasEmail: !!session.user.email
      }
    }, { status: 200 });
  } catch (error) {
    console.error("🔐 [AUTH STATUS DEBUG] Error checking auth status:", error);
    console.error("🔐 [AUTH STATUS DEBUG] Error type:", typeof error);
    console.error("🔐 [AUTH STATUS DEBUG] Error message:", error instanceof Error ? error.message : 'Unknown error');
    console.error("🔐 [AUTH STATUS DEBUG] Error stack:", error instanceof Error ? error.stack : 'No stack trace');

    return NextResponse.json(
      {
        isSignedIn: false,
        user: null,
        error: "Failed to check authentication status",
        debug: {
          errorType: typeof error,
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
          hasStack: error instanceof Error ? !!error.stack : false
        }
      },
      { status: 500 }
    );
  }
}
