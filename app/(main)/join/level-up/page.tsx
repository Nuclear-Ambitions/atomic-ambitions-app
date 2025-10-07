'use client'

import PickAndPay from './PickAndPay'
import Confirmation from './Confirmation'
import { useAuthStore } from '@/lib/stores/auth-store'

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
  const {
    isSignedIn,
    user,
    checkAuthStatus,
    isLoading: authLoading,
  } = useAuthStore()

  const hasActiveSubscription = false

  return (
    <div>
      {!isSignedIn ? (
        <SignInMsg />
      ) : !hasActiveSubscription ? (
        <PickAndPay />
      ) : (
        <Confirmation />
      )}
    </div>
  )
}
