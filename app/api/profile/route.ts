import { NextRequest, NextResponse } from 'next/server'
import { auth } from '../../auth'
import { db } from '@/lib/db/Database'
import { ProfileData, ProfileResponse, ProfileUpdateRequest } from '@/types/custom'

// GET /api/profile - Get current user's profile
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Get user profile data
    const profileData = await db
      .selectFrom('users')
      .leftJoin('user_profiles', 'users.id', 'user_profiles.user_id')
      .select([
        'users.alias',
        'users.handle',
        'user_profiles.bio',
        'user_profiles.location',
        'user_profiles.own_website',
        'user_profiles.why_joined',
        'user_profiles.why_nuclear',
        'user_profiles.avatar_url',
        'user_profiles.glam_shot_url',
      ])
      .where('users.id', '=', userId)
      .executeTakeFirst()

    // Get profile favorites
    const favorites = await db
      .selectFrom('profile_favorites_links')
      .innerJoin('user_profiles', 'profile_favorites_links.user_profile_id', 'user_profiles.id')
      .select([
        'profile_favorites_links.id',
        'profile_favorites_links.label',
        'profile_favorites_links.url',
        'profile_favorites_links.explanation',
        'profile_favorites_links.order',
      ])
      .where('user_profiles.user_id', '=', userId)
      .orderBy('profile_favorites_links.order', 'asc')
      .execute()

    // Get profile social IDs
    const socialIds = await db
      .selectFrom('profile_social_ids')
      .innerJoin('user_profiles', 'profile_social_ids.user_profile_id', 'user_profiles.id')
      .select([
        'profile_social_ids.id',
        'profile_social_ids.platform_code',
        'profile_social_ids.social_id',
      ])
      .where('user_profiles.user_id', '=', userId)
      .execute()

    // Get available social platforms
    const socialPlatforms = await db
      .selectFrom('social_platforms')
      .selectAll()
      .execute()

    const response: ProfileResponse = {
      profile: {
        alias: profileData?.alias || null,
        handle: profileData?.handle || null,
        bio: profileData?.bio || null,
        location: profileData?.location || null,
        own_website: profileData?.own_website || null,
        why_joined: profileData?.why_joined || null,
        why_nuclear: profileData?.why_nuclear || null,
        avatar_url: profileData?.avatar_url || null,
        glam_shot_url: profileData?.glam_shot_url || null,
      },
      favorites,
      socialIds,
      socialPlatforms,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/profile - Update current user's profile
export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const body: ProfileUpdateRequest = await request.json()

    await db.transaction().execute(async (trx) => {
      // Update users table fields
      if (body.profile.alias !== undefined || body.profile.handle !== undefined) {
        await trx
          .updateTable('users')
          .set({
            alias: body.profile.alias,
            handle: body.profile.handle,
            updated_at: new Date(),
          })
          .where('id', '=', userId)
          .execute()
      }

      // Get or create user profile
      let userProfile = await trx
        .selectFrom('user_profiles')
        .select('id')
        .where('user_id', '=', userId)
        .executeTakeFirst()

      if (!userProfile) {
        const newProfile = await trx
          .insertInto('user_profiles')
          .values({
            user_id: userId,
            bio: body.profile.bio || null,
            location: body.profile.location || null,
            own_website: body.profile.own_website || null,
            why_joined: body.profile.why_joined || null,
            why_nuclear: body.profile.why_nuclear || null,
            avatar_url: body.profile.avatar_url || null,
            glam_shot_url: body.profile.glam_shot_url || null,
          })
          .returning('id')
          .executeTakeFirst()
        userProfile = newProfile
      } else {
        // Update existing user profile
        await trx
          .updateTable('user_profiles')
          .set({
            bio: body.profile.bio,
            location: body.profile.location,
            own_website: body.profile.own_website,
            why_joined: body.profile.why_joined,
            why_nuclear: body.profile.why_nuclear,
            avatar_url: body.profile.avatar_url,
            glam_shot_url: body.profile.glam_shot_url,
            updated_at: new Date(),
          })
          .where('id', '=', userProfile.id)
          .execute()
      }

      if (!userProfile) {
        return NextResponse.json({ error: 'Unable to store profile data' }, { status: 500 })
      }

      // Update favorites if provided
      if (body.favorites !== undefined) {
        // Delete existing favorites
        await trx
          .deleteFrom('profile_favorites_links')
          .where('user_profile_id', '=', userProfile.id)
          .execute()

        // Insert new favorites
        if (body.favorites.length > 0) {
          await trx
            .insertInto('profile_favorites_links')
            .values(
              body.favorites.map((fav, index) => ({
                user_profile_id: userProfile.id,
                label: fav.label,
                url: fav.url,
                explanation: fav.explanation,
                order: fav.order ?? index,
              }))
            )
            .execute()
        }
      }

      // Update social IDs if provided
      if (body.socialIds !== undefined) {
        // Delete existing social IDs
        await trx
          .deleteFrom('profile_social_ids')
          .where('user_profile_id', '=', userProfile.id)
          .execute()

        // Insert new social IDs
        if (body.socialIds.length > 0) {
          await trx
            .insertInto('profile_social_ids')
            .values(
              body.socialIds.map((social) => ({
                user_profile_id: userProfile.id,
                platform_code: social.platform_code,
                social_id: social.social_id,
              }))
            )
            .execute()
        }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/profile - Publish/unpublish profile or update individual fields
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const body = await request.json()

    // Handle publish/unpublish
    if (body.published !== undefined) {
      const { published } = body

      // Get user profile ID
      const userProfile = await db
        .selectFrom('user_profiles')
        .select('id')
        .where('user_id', '=', userId)
        .executeTakeFirst()

      if (!userProfile) {
        return NextResponse.json({ error: 'User profile not found' }, { status: 404 })
      }

      // Update published status
      await db
        .updateTable('user_profiles')
        .set({
          published_at: published ? new Date() : null,
          updated_at: new Date(),
        })
        .where('id', '=', userProfile.id)
        .execute()

      return NextResponse.json({ success: true, published })
    }

    // Handle field-level updates
    if (body.field && body.value !== undefined) {
      const { field, value } = body

      // Get or create user profile
      let userProfile = await db
        .selectFrom('user_profiles')
        .select('id')
        .where('user_id', '=', userId)
        .executeTakeFirst()

      if (!userProfile) {
        const newProfile = await db
          .insertInto('user_profiles')
          .values({
            user_id: userId,
            [field]: value,
          })
          .returning('id')
          .executeTakeFirst()
        userProfile = newProfile
      } else {
        // Update specific field
        await db
          .updateTable('user_profiles')
          .set({
            [field]: value,
            updated_at: new Date(),
          })
          .where('id', '=', userProfile.id)
          .execute()
      }

      return NextResponse.json({ success: true, field, value })
    }

    // Handle user table field updates (alias, handle)
    if (body.field && ['alias', 'handle'].includes(body.field)) {
      const { field, value } = body

      await db
        .updateTable('users')
        .set({
          [field]: value,
          updated_at: new Date(),
        })
        .where('id', '=', userId)
        .execute()

      return NextResponse.json({ success: true, field, value })
    }

    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
