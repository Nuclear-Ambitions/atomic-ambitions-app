import { NextRequest, NextResponse } from 'next/server'
import { auth } from '../../../auth'
import { db } from '@/lib/db/Database'

// POST /api/profile/check-handle - Check if a handle is available
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { handle } = await request.json()

    if (!handle || typeof handle !== 'string') {
      return NextResponse.json({ error: 'Handle is required' }, { status: 400 })
    }

    // Validate handle format (URL-safe characters only)
    const handleRegex = /^[a-zA-Z0-9_-]+$/
    if (!handleRegex.test(handle)) {
      return NextResponse.json({
        error: 'Handle can only contain letters, numbers, underscores, and hyphens'
      }, { status: 400 })
    }

    // Check if handle is already taken by another user
    const existingUser = await db
      .selectFrom('users')
      .select('id')
      .where('handle', '=', handle)
      .where('id', '!=', session.user.id) // Exclude current user
      .executeTakeFirst()

    const isAvailable = !existingUser

    return NextResponse.json({
      available: isAvailable,
      handle
    })
  } catch (error) {
    console.error('Error checking handle availability:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
