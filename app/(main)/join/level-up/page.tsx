'use client'

import PickAndPay from './PickAndPay'
import Confirmation from './Confirmation'
import { useSession } from 'next-auth/react'

// NOTE: this page is an alternative to the subscribe page. Since subscribe page is working, just keeping this as an option for later.

function SignInMsg() {
  return (
    <div className='min-h-screen max-w-4xl mx-auto bg-background py-12'>
      <h1 className='mb-6'>Level Up Your Membership</h1>
      <p>First, you need to sign in.</p>
    </div>
  )
}

export default function LevelUpPage() {
  const session = useSession()
  const isSignedIn = session.status === 'authenticated'
  const isSubscriber = session.data?.user?.summary?.isSubscriber

  return (
    <div>
      {!isSignedIn ? (
        <SignInMsg />
      ) : !isSubscriber ? (
        <PickAndPay />
      ) : (
        <Confirmation />
      )}
    </div>
  )
}
