import { Turnstile } from '@marsidev/react-turnstile'
import { useState } from 'react'

type Status = 'error' | 'expired' | 'solved';

export default function Widget() {
  const [turnstile, setTurnstile] = useState<Status | null>(null)

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  if (!turnstileSiteKey) {
    return <div>Turnstile site key is not set</div>
  }

  return (
    <Turnstile
      siteKey={turnstileSiteKey}
      options={{
        size: 'flexible',
      }}
      onError={() => setTurnstile('error')}
      onExpire={() => setTurnstile('expired')}
      onSuccess={() => setTurnstile('solved')}
    />
  )
}
