import { db } from '../db/Database'
import { ProfileData, ProfileFavorite, ProfileSocialId } from '@/types/custom'

export interface ProfileResponse {
  profile: ProfileData
  favorites: ProfileFavorite[]
  socialIds: ProfileSocialId[]
  socialPlatforms: Array<{
    code: string
    display_name: string
    profile_url_format: string | null
  }>
}

export const ProfileDataAccess = {
  async getProfile(userId: string): Promise<ProfileResponse | null> {
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

    return {
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
  },

  async updateUserField(userId: string, field: 'alias' | 'handle', value: string): Promise<void> {
    await db
      .updateTable('users')
      .set({
        [field]: value,
        updated_at: new Date(),
      })
      .where('id', '=', userId)
      .execute()
  },

  async updateProfileField(userId: string, field: keyof ProfileData, value: string): Promise<void> {
    // Get or create user profile
    let userProfile = await db
      .selectFrom('user_profiles')
      .select('id')
      .where('user_id', '=', userId)
      .executeTakeFirst()

    if (!userProfile) {
      await db
        .insertInto('user_profiles')
        .values({
          user_id: userId,
          [field]: value,
        })
        .execute()
    } else {
      await db
        .updateTable('user_profiles')
        .set({
          [field]: value,
          updated_at: new Date(),
        })
        .where('id', '=', userProfile.id)
        .execute()
    }
  },

  async updateFullProfile(
    userId: string,
    profile: ProfileData,
    favorites: ProfileFavorite[],
    socialIds: ProfileSocialId[]
  ): Promise<void> {
    await db.transaction().execute(async (trx) => {
      // Update users table fields
      if (profile.alias !== undefined || profile.handle !== undefined) {
        await trx
          .updateTable('users')
          .set({
            alias: profile.alias,
            handle: profile.handle,
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
            bio: profile.bio || null,
            location: profile.location || null,
            own_website: profile.own_website || null,
            why_joined: profile.why_joined || null,
            why_nuclear: profile.why_nuclear || null,
            avatar_url: profile.avatar_url || null,
            glam_shot_url: profile.glam_shot_url || null,
          })
          .returning('id')
          .executeTakeFirst()
        userProfile = newProfile
      } else {
        // Update existing user profile
        await trx
          .updateTable('user_profiles')
          .set({
            bio: profile.bio,
            location: profile.location,
            own_website: profile.own_website,
            why_joined: profile.why_joined,
            why_nuclear: profile.why_nuclear,
            avatar_url: profile.avatar_url,
            glam_shot_url: profile.glam_shot_url,
            updated_at: new Date(),
          })
          .where('id', '=', userProfile.id)
          .execute()
      }

      if (!userProfile) {
        throw new Error('Unable to store profile data')
      }

      // Update favorites
      await trx
        .deleteFrom('profile_favorites_links')
        .where('user_profile_id', '=', userProfile.id)
        .execute()

      if (favorites.length > 0) {
        await trx
          .insertInto('profile_favorites_links')
          .values(
            favorites.map((fav, index) => ({
              user_profile_id: userProfile.id,
              label: fav.label,
              url: fav.url,
              explanation: fav.explanation,
              order: fav.order ?? index,
            }))
          )
          .execute()
      }

      // Update social IDs
      await trx
        .deleteFrom('profile_social_ids')
        .where('user_profile_id', '=', userProfile.id)
        .execute()

      if (socialIds.length > 0) {
        await trx
          .insertInto('profile_social_ids')
          .values(
            socialIds.map((social) => ({
              user_profile_id: userProfile.id,
              platform_code: social.platform_code,
              social_id: social.social_id,
            }))
          )
          .execute()
      }
    })
  },

  async updatePublishStatus(userId: string, published: boolean): Promise<void> {
    // Get user profile ID
    const userProfile = await db
      .selectFrom('user_profiles')
      .select('id')
      .where('user_id', '=', userId)
      .executeTakeFirst()

    if (!userProfile) {
      throw new Error('User profile not found')
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
  },

  async addFavorite(userId: string, favorite: ProfileFavorite): Promise<void> {
    const userProfile = await db
      .selectFrom('user_profiles')
      .select('id')
      .where('user_id', '=', userId)
      .executeTakeFirst()

    if (!userProfile) {
      throw new Error('User profile not found')
    }

    // Get the next order number
    const maxOrder = await db
      .selectFrom('profile_favorites_links')
      .select(db.fn.max('order').as('maxOrder'))
      .where('user_profile_id', '=', userProfile.id)
      .executeTakeFirst()

    const nextOrder = (maxOrder?.maxOrder ?? -1) + 1

    await db
      .insertInto('profile_favorites_links')
      .values({
        user_profile_id: userProfile.id,
        label: favorite.label,
        url: favorite.url,
        explanation: favorite.explanation,
        order: nextOrder,
      })
      .execute()
  },

  async addSocialId(userId: string, socialId: ProfileSocialId): Promise<void> {
    const userProfile = await db
      .selectFrom('user_profiles')
      .select('id')
      .where('user_id', '=', userId)
      .executeTakeFirst()

    if (!userProfile) {
      throw new Error('User profile not found')
    }

    await db
      .insertInto('profile_social_ids')
      .values({
        user_profile_id: userProfile.id,
        platform_code: socialId.platform_code,
        social_id: socialId.social_id,
      })
      .execute()
  },
}
