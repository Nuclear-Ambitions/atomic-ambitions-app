import { SubscriptionSummary } from '@/lib/data/subscriptions'
import Link from 'next/link'

function Confirmation({
  subscription,
}: {
  subscription?: SubscriptionSummary
}) {
  console.log('🔍 [CONFIRMATION] subscription:', subscription)

  const interval =
    subscription?.interval === 'month'
      ? 'monthly'
      : subscription?.interval === 'year'
      ? 'annually'
      : 'unknown'

  return (
    <div className='min-h-screen bg-background py-12'>
      <div className='container mx-auto px-6'>
        <div className='max-w-2xl mx-auto'>
          <div className='text-center mb-8'>
            <div className='w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center'>
              <span className='text-4xl'>🎉</span>
            </div>
            <h1 className='text-4xl font-bold text-primary mb-4'>
              Welcome, Charter Member!
            </h1>
            <p className='text-xl text-muted-foreground'>
              Thank you for supporting the Atomic Ambitions platform. Your
              subscription is now active.
            </p>
          </div>

          <div className='card mb-8'>
            <h2 className='text-2xl font-bold text-primary mb-4'>
              Your Charter Member Benefits
            </h2>
            <div className='space-y-3'>
              <div className='flex items-center space-x-3'>
                <span className='text-green-500 font-bold'>✓</span>
                <span className='text-foreground'>
                  Our gratitude for your support
                </span>
              </div>
              <div className='flex items-center space-x-3'>
                <span className='text-green-500 font-bold'>✓</span>
                <span className='text-foreground'>
                  Access to premium content
                </span>
              </div>
              <div className='flex items-center space-x-3'>
                <span className='text-green-500 font-bold'>✓</span>
                <span className='text-foreground'>
                  Your plan renews {interval}. Cancel anytime
                </span>
              </div>
            </div>
          </div>

          <div className='text-center'>
            <Link href='/clubroom' className='btn btn-primary'>
              Go to Clubroom
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
