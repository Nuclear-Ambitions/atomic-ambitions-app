import { NextRequest, NextResponse } from 'next/server'
import { auth } from '../../../../auth'
import { db } from '@/lib/db/Database'
import { ProfileSocialId } from '@/types/custom'

// PUT /api/profile/social-ids/[id] - Update a social ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const socialId = parseInt(resolvedParams.id)
    const body: Partial<ProfileSocialId> = await request.json()

    // Verify the social ID belongs to the current user
    const existingSocialId = await db
      .selectFrom('profile_social_ids')
      .innerJoin('user_profiles', 'profile_social_ids.user_profile_id', 'user_profiles.id')
      .select('profile_social_ids.id')
      .where('profile_social_ids.id', '=', socialId)
      .where('user_profiles.user_id', '=', userId)
      .executeTakeFirst()

    if (!existingSocialId) {
      return NextResponse.json({ error: 'Social ID not found' }, { status: 404 })
    }

    // If platform_code is being updated, check if it's valid
    if (body.platform_code) {
      const platform = await db
        .selectFrom('social_platforms')
        .select('code')
        .where('code', '=', body.platform_code)
        .executeTakeFirst()

      if (!platform) {
        return NextResponse.json({ error: 'Invalid platform code' }, { status: 400 })
      }
    }

    const updatedSocialId = await db
      .updateTable('profile_social_ids')
      .set({
        platform_code: body.platform_code,
        social_id: body.social_id,
      })
      .where('id', '=', socialId)
      .returningAll()
      .executeTakeFirst()

    return NextResponse.json(updatedSocialId)
  } catch (error) {
    console.error('Error updating social ID:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/profile/social-ids/[id] - Delete a social ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const socialId = parseInt(resolvedParams.id)

    // Verify the social ID belongs to the current user
    const existingSocialId = await db
      .selectFrom('profile_social_ids')
      .innerJoin('user_profiles', 'profile_social_ids.user_profile_id', 'user_profiles.id')
      .select('profile_social_ids.id')
      .where('profile_social_ids.id', '=', socialId)
      .where('user_profiles.user_id', '=', userId)
      .executeTakeFirst()

    if (!existingSocialId) {
      return NextResponse.json({ error: 'Social ID not found' }, { status: 404 })
    }

    await db
      .deleteFrom('profile_social_ids')
      .where('id', '=', socialId)
      .execute()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting social ID:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
