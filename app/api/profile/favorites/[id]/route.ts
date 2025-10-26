import { NextResponse } from 'next/server'
import { auth } from '../../../../auth'
import { db } from '@/lib/db/Database'
import { ProfileFavorite } from '@/types/custom'

// PUT /api/profile/favorites/[id] - Update a favorite
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const favoriteId = parseInt(resolvedParams.id)
    const body: Partial<ProfileFavorite> = await request.json()

    // Verify the favorite belongs to the current user
    const existingFavorite = await db
      .selectFrom('profile_favorites_links')
      .innerJoin('user_profiles', 'profile_favorites_links.user_profile_id', 'user_profiles.id')
      .select('profile_favorites_links.id')
      .where('profile_favorites_links.id', '=', favoriteId)
      .where('user_profiles.user_id', '=', userId)
      .executeTakeFirst()

    if (!existingFavorite) {
      return NextResponse.json({ error: 'Favorite not found' }, { status: 404 })
    }

    const updatedFavorite = await db
      .updateTable('profile_favorites_links')
      .set({
        label: body.label,
        url: body.url,
        explanation: body.explanation,
        order: body.order,
      })
      .where('id', '=', favoriteId)
      .returningAll()
      .executeTakeFirst()

    return NextResponse.json(updatedFavorite)
  } catch (error) {
    console.error('Error updating favorite:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/profile/favorites/[id] - Delete a favorite
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const favoriteId = parseInt(resolvedParams.id)

    // Verify the favorite belongs to the current user
    const existingFavorite = await db
      .selectFrom('profile_favorites_links')
      .innerJoin('user_profiles', 'profile_favorites_links.user_profile_id', 'user_profiles.id')
      .select('profile_favorites_links.id')
      .where('profile_favorites_links.id', '=', favoriteId)
      .where('user_profiles.user_id', '=', userId)
      .executeTakeFirst()

    if (!existingFavorite) {
      return NextResponse.json({ error: 'Favorite not found' }, { status: 404 })
    }

    await db
      .deleteFrom('profile_favorites_links')
      .where('id', '=', favoriteId)
      .execute()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting favorite:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
