'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function UserAccountWidget() {
  const session = useSession()

  const handleSignOut = () => {
    signOut()
  }

  const handleSignIn = () => {
    signIn()
  }

  console.log('session', session)
  if (session.status === 'authenticated') {
    return (
      <div>
        <button className='btn btn-primary text-sm' onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    )
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
