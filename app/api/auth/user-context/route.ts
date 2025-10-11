import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { UserDataAccess } from '@/lib/data/users'

export async function GET(request: NextRequest) {
  try {
    console.log('🔐 [USER CONTEXT] Fetching user context...')
    const session = await auth()

    console.log('🔐 [USER CONTEXT] Session:', {
      hasSession: !!session,
      session
    })

    if (!session?.user?.id) {
      console.log('🔐 [USER CONTEXT] No session or user ID found')
      return NextResponse.json(
        {
          isSignedIn: false,
          userContext: null,
        },
        { status: 404 }
      )
    }

    // TODO: Look for session in database; if not found, return 404

    // Fetch user data with membership info
    const userContext = await UserDataAccess.getUserContext(session.user.id)

    if (!userContext) {
      console.log('🔐 [USER CONTEXT] User not found')
      return NextResponse.json(
        {
          isSignedIn: false,
          userContext: null,
          error: 'User not found',
        },
        { status: 404 }
      )
    }

    const responseData = {
      isSignedIn: true,
      userContext,
    }

    console.log('🔐 [USER CONTEXT] Returning user context:', responseData)
    return NextResponse.json(responseData, { status: 200 })
  } catch (error) {
    console.error('🔐 [USER CONTEXT] Error fetching user context:', error)
    return NextResponse.json(
      {
        isSignedIn: false,
        user: null,
        error: 'Failed to fetch user context',
      },
      { status: 500 }
    )
  }
}

