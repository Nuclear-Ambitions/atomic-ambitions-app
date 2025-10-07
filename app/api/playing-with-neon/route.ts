import { NextResponse } from 'next/server'
import { db } from '@/lib/db/Database'

export async function GET() {
  try {
    const data = await db.selectFrom('playing_with_neon').selectAll().execute()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching playing_with_neon data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}
