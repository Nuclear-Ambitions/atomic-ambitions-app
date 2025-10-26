import { NextRequest, NextResponse } from 'next/server'
import { auth } from '../../../auth'
import { db } from '@/lib/db/Database'
import { ProfileSocialId } from '@/types/custom'

// POST /api/profile/social-ids - Add a new social ID
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const body: Omit<ProfileSocialId, 'id'> = await request.json()

    // Get user profile ID
    const userProfile = await db
      .selectFrom('user_profiles')
      .select('id')
      .where('user_id', '=', userId)
      .executeTakeFirst()

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 })
    }

    // Check if social platform exists
    const platform = await db
      .selectFrom('social_platforms')
      .select('code')
      .where('code', '=', body.platform_code)
      .executeTakeFirst()

    if (!platform) {
      return NextResponse.json({ error: 'Invalid platform code' }, { status: 400 })
    }

    // Check if user already has this platform
    const existingSocialId = await db
      .selectFrom('profile_social_ids')
      .select('id')
      .where('user_profile_id', '=', userProfile.id)
      .where('platform_code', '=', body.platform_code)
      .executeTakeFirst()

    if (existingSocialId) {
      return NextResponse.json({ error: 'Social ID for this platform already exists' }, { status: 400 })
    }

    const newSocialId = await db
      .insertInto('profile_social_ids')
      .values({
        user_profile_id: userProfile.id,
        platform_code: body.platform_code,
        social_id: body.social_id,
      })
      .returningAll()
      .executeTakeFirst()

    return NextResponse.json(newSocialId)
  } catch (error) {
    console.error('Error adding social ID:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
