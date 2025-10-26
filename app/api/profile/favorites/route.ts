import { NextRequest, NextResponse } from 'next/server'
import { auth } from '../../../auth'
import { db } from '@/lib/db/Database'
import { ProfileFavorite } from '@/types/custom'

// POST /api/profile/favorites - Add a new favorite
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const body: Omit<ProfileFavorite, 'id'> = await request.json()

    // Get user profile ID
    const userProfile = await db
      .selectFrom('user_profiles')
      .select('id')
      .where('user_id', '=', userId)
      .executeTakeFirst()

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 })
    }

    // Get the next order number
    const maxOrder = await db
      .selectFrom('profile_favorites_links')
      .select((eb) => eb.fn.max('order').as('max_order'))
      .where('user_profile_id', '=', userProfile.id)
      .executeTakeFirst()

    const newFavorite = await db
      .insertInto('profile_favorites_links')
      .values({
        user_profile_id: userProfile.id,
        label: body.label,
        url: body.url,
        explanation: body.explanation,
        order: body.order ?? (maxOrder?.max_order ?? 0) + 1,
      })
      .returningAll()
      .executeTakeFirst()

    return NextResponse.json(newFavorite)
  } catch (error) {
    console.error('Error adding favorite:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
