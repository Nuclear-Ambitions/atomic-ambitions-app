import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
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
      )
    }
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
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        isSignedIn: false,
        user: null,
        error: 'Failed to check authentication status',
        debug: {
          errorType: typeof error,
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
          hasStack: error instanceof Error ? !!error.stack : false
        }
      },
      { status: 500 }
    )
  }
}
