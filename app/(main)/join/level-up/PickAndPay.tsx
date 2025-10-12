import Benefits from './Benefits'
import PlanOptions from './PlanOptions'
import { useSession } from 'next-auth/react'

function PickAndPay() {
  const user = useSession().data?.user

  const handlePayment = async (interval: string) => {
    console.log('Time to collect big $$: ' + interval)

    console.log('User: ' + user)

    if (!user) {
      console.error('User not found')
      return
    }

    try {
      // Create checkout session with Stripe
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productCode: 'charter-member',
          interval,
          userId: user?.id,
          email: user?.email,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to create checkout session ${response}`)
      }

      const { url } = await response.json()

      // Redirect to Stripe checkout
      window.location.href = url
    } catch (error) {
      console.error('Payment error:', error)
    } finally {
      console.log('Payment handled')
    }
  }

  return (
    <div className='min-h-screen max-w-4xl mx-auto bg-background py-12'>
      <h1 className='mb-6'>Become a Charter Member</h1>
      <div className='space-y-4'>
        <p className='text-center text-lg'>
          As a charter member, you help us power the platform that empowers the
          people. Your support matters.
        </p>
        <Benefits />
        <PlanOptions onSelect={handlePayment} />
      </div>
    </div>
  )
}

export default PickAndPay
