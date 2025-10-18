import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/Database'
import { ProfileResponse } from '@/types/custom'

// GET /api/profile/public/[handle] - Get public profile by handle
export async function GET(
  request: NextRequest,
  { params }: { params: { handle: string } }
) {
  try {
    const { handle } = await params

    // Get user by handle
    const user = await db
      .selectFrom('users')
      .select('id')
      .where('handle', '=', handle)
      .executeTakeFirst()

    if (!user) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const userId = user.id

    // Get user profile data (only published profiles)
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
        'user_profiles.published_at',
      ])
      .where('users.id', '=', userId)
      .where('user_profiles.published_at', 'is not', null) // Only published profiles
      .executeTakeFirst()

    if (!profileData) {
      return NextResponse.json({ error: 'Profile not published' }, { status: 404 })
    }

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
        alias: profileData.alias || null,
        handle: profileData.handle || null,
        bio: profileData.bio || null,
        location: profileData.location || null,
        own_website: profileData.own_website || null,
        why_joined: profileData.why_joined || null,
        why_nuclear: profileData.why_nuclear || null,
        avatar_url: profileData.avatar_url || null,
        glam_shot_url: profileData.glam_shot_url || null,
      },
      favorites,
      socialIds,
      socialPlatforms,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching public profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
