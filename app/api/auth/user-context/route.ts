import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db/Database'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
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

    if (!userData) {
      return NextResponse.json(
        {
          isSignedIn: false,
          user: null,
          error: 'User not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
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
    }, { status: 200 })
  } catch (error) {
    console.error('Failed to fetch user context:', error)
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

