import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db/Database'

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
          user: null,
        },
        { status: 401 }
      )
    }

    // Fetch user data with membership info
    const userData = await db
      .selectFrom('users')
      .leftJoin('memberships', 'users.id', 'memberships.user_id')
      .select([
        'users.id',
        'users.email',
        'users.name',
        'users.alias',
        'users.image',
        'memberships.level',
        'memberships.status',
        'memberships.joined_at',
      ])
      .where('users.id', '=', session.user.id)
      .executeTakeFirst()

    console.log('🔐 [USER CONTEXT] Database query result:', {
      found: !!userData,
      id: userData?.id,
      email: userData?.email,
      name: userData?.name,
      alias: userData?.alias,
      hasImage: !!userData?.image,
      membershipLevel: userData?.level,
      membershipStatus: userData?.status,
    })

    if (!userData) {
      console.log('🔐 [USER CONTEXT] User not found in database')
      return NextResponse.json(
        {
          isSignedIn: false,
          user: null,
          error: 'User not found',
        },
        { status: 404 }
      )
    }

    const responseData = {
      isSignedIn: true,
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        alias: userData.alias,
        image: userData.image,
        membership: {
          level: userData.level || 'unknown',
          status: userData.status || 'unknown',
          joinedAt: userData.joined_at,
        },
      },
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

