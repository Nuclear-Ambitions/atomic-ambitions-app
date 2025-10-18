import { NextRequest, NextResponse } from 'next/server'
import { auth } from '../../auth'
import { ProfileData, ProfileUpdateRequest, ProfileFavorite, ProfileSocialId } from '@/types/custom'
import { ProfileDataAccess } from '@/lib/data/profiles'

// GET /api/profile - Get current user's profile
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const profileData = await ProfileDataAccess.getProfile(userId)

    if (!profileData) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    return NextResponse.json(profileData)
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

    await ProfileDataAccess.updateFullProfile(
      userId,
      body.profile as ProfileData,
      body.favorites || [],
      body.socialIds || []
    )

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
      await ProfileDataAccess.updatePublishStatus(userId, published)
      return NextResponse.json({ success: true, published })
    }

    // Handle field-level updates
    if (body.field && body.value !== undefined) {
      const { field, value } = body

      // Handle user table fields (alias, handle)
      if (['alias', 'handle'].includes(field)) {
        await ProfileDataAccess.updateUserField(userId, field as 'alias' | 'handle', value)
      } else {
        // Handle profile table fields
        await ProfileDataAccess.updateProfileField(userId, field as keyof ProfileData, value)
      }

      return NextResponse.json({ success: true, field, value })
    }

    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/profile - Add individual items (favorites or social IDs)
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const body = await request.json()
    const { type, item } = body

    if (type === 'favorite') {
      const favorite = item as ProfileFavorite
      await ProfileDataAccess.addFavorite(userId, favorite)
    } else if (type === 'socialId') {
      const socialId = item as ProfileSocialId
      await ProfileDataAccess.addSocialId(userId, socialId)
    } else {
      return NextResponse.json({ error: 'Invalid item type' }, { status: 400 })
    }

    // Return updated profile data
    const profileData = await ProfileDataAccess.getProfile(userId)
    return NextResponse.json(profileData)
  } catch (error) {
    console.error('Error adding item:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
