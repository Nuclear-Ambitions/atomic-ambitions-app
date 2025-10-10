import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { RegistrationData } from '@/(main)/join/registration/types'
import { db } from '@/lib/db/Database'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    const user = await db.selectFrom('users').selectAll().where('id', '=', userId).executeTakeFirst()
    if (!user) {
      return NextResponse.json(
        { message: 'Sign in to register' },
        { status: 401 }
      )
    }

    const membership = await db
      .selectFrom('memberships')
      .selectAll()
      .where('user_id', '=', user.id)
      .executeTakeFirst()

    const registration: RegistrationData = {
      userId: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
      alias: user.alias,
      membershipId: membership?.id,
      agreedToTerms: membership?.agreed_to_terms,
      privacyPolicyOk: membership?.privacy_policy_ok,
      status: membership?.status,
      level: membership?.level,
      joinedAt: membership?.joined_at
    }

    return NextResponse.json(registration, { status: 200 })
  } catch (error) {
    console.error('Error fetching registration state:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      alias?: string;
      termsAcceptedAt?: Date;
      privacyPolicyAcceptedAt?: Date;
    } | Partial<RegistrationData>

    if (!('alias' in body && 'termsAcceptedAt' in body && 'privacyPolicyAcceptedAt' in body)) {
      return NextResponse.json(
        { message: 'Invalid request format' },
        { status: 400 }
      )
    }

    // Handle membership creation
    const { alias, termsAcceptedAt, privacyPolicyAcceptedAt } = body

    // Validate required fields
    if (!alias || !termsAcceptedAt || !privacyPolicyAcceptedAt) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get authenticated user
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // Update users table with alias
    await db
      .updateTable('users')
      .set({ alias })
      .where('id', '=', userId)
      .execute()

    // Insert membership record
    const membership = await db
      .insertInto('memberships')
      .values({
        user_id: userId,
        level: 'explorer',
        status: 'active',
        joined_at: new Date(),
        agreed_to_terms: termsAcceptedAt,
        privacy_policy_ok: privacyPolicyAcceptedAt,
      })
      .returning('id')
      .executeTakeFirst()

    if (!membership) {
      return NextResponse.json(
        { message: 'Failed to create membership' },
        { status: 500 }
      )
    }

    console.log('Membership created successfully:', {
      userId,
      membershipId: membership.id,
      alias,
      level: 'explorer',
      status: 'active',
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        message: 'Membership created successfully',
        membershipId: membership.id,
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
