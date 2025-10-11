'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function AvatarDropdown() {
  const router = useRouter()

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: '/' })
    router.push(data.url)
  }

  return (
    <div>
      <button className='btn btn-primary text-sm' onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  )
}

export default function UserAccountWidget() {
  const session = useSession()

  const handleSignIn = () => {
    signIn()
  }

  console.log('session', session)
  if (session.status === 'authenticated') {
    return <AvatarDropdown />
  } else {
    return (
      <div>
        <button className='btn btn-primary text-sm' onClick={handleSignIn}>
          Sign In
        </button>
      </div>
    )
  }
}
