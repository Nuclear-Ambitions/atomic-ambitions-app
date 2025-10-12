import { NextRequest, NextResponse } from 'next/server'

async function verifyTurnstile(token: string): Promise<boolean> {
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`
    })

    const result = await response.json() as { success: boolean }
    return result.success
  } catch (error) {
    console.error('🔐 [TURNSTILE DEBUG] Error verifying Turnstile token:', error)
    console.error('🔐 [TURNSTILE DEBUG] Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { token: string }
    const { token } = body
    const isValidToken = await verifyTurnstile(token)

    return NextResponse.json({
      isValidToken,
      debug: {
        tokenLength: token?.length || 0,
        hasSecretKey: !!process.env.TURNSTILE_SECRET_KEY,
        environment: process.env.NODE_ENV
      }
    })
  } catch (error) {
    console.error('🔐 [TURNSTILE DEBUG] Error in POST handler:', error)
    console.error('🔐 [TURNSTILE DEBUG] Error stack:', error instanceof Error ? error.stack : 'No stack trace')

    return NextResponse.json({
      isValidToken: false,
      error: 'Failed to verify Turnstile token',
      debug: {
        errorType: typeof error,
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      }
    }, { status: 500 })
  }
}
