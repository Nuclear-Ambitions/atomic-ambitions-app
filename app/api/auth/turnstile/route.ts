import { NextRequest, NextResponse } from "next/server";

async function verifyTurnstile(token: string): Promise<boolean> {
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`
  });
  const result = await response.json() as { success: boolean };
  return result.success;
}

export async function POST(request: NextRequest) {
  const body = await request.json() as { token: string };
  const { token } = body;
  const isValidToken = await verifyTurnstile(token);
  return NextResponse.json({ isValidToken });
}
