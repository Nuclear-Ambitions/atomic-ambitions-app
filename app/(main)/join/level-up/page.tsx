'use client'

import Confirmation from './Confirmation'

function SignInMsg() {
  return (
    <>
      <p>Let's get you signed in first.</p>
    </>
  )
}

function PickAndPay() {
  return (
    <>
      <p>Pick a level, and set up payment.</p>
      <Buttony />
    </>
  )
}

function Buttony() {
  return (
    <div>
      <button
        className='btn btn-outline'
        id='levelUp'
        onClick={() => alert('Feel the power boost!')}
      >
        Level Up
      </button>
    </div>
  )
}

export default function LevelUpPage() {
  const isSignedIn = true
  const hasActiveSubscription = false

  return (
    <div className='min-h-screen max-w-4xl mx-auto bg-background py-12'>
      <h1 className='mb-6'>Level Up Your Membership</h1>
      <div className='space-y-4'>
        <p>
          Power the platform that empowers the people. Your support matters.
          Thank you!
        </p>
        {!isSignedIn ? (
          <SignInMsg />
        ) : !hasActiveSubscription ? (
          <PickAndPay />
        ) : (
          <Confirmation />
        )}
      </div>
    </div>
  )
}
