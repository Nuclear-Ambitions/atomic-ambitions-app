// Profile-related types
export interface ProfileData {
  // From users table
  alias: string | null
  handle: string | null

  // From user_profiles table
  bio: string | null
  location: string | null
  own_website: string | null
  why_joined: string | null
  why_nuclear: string | null
  avatar_url: string | null
  glam_shot_url: string | null
}

export interface ProfileFavorite {
  id?: number
  label: string | null
  url: string | null
  explanation: string | null
  order: number | null
}

export interface ProfileSocialId {
  id?: number
  platform_code: string
  social_id: string | null
}

export interface SocialPlatform {
  code: string
  display_name: string
  profile_url_format: string | null
}

export interface ProfileUpdateRequest {
  profile: Partial<ProfileData>
  favorites?: ProfileFavorite[]
  socialIds?: ProfileSocialId[]
}

export interface ProfileResponse {
  profile: ProfileData
  favorites: ProfileFavorite[]
  socialIds: ProfileSocialId[]
  socialPlatforms: SocialPlatform[]
}
