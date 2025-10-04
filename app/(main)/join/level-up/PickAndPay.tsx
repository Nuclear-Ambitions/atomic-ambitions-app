import { useState } from 'react'
import Benefits from './Benefits'
import AtomicButton from './AtomicButton'

function PickAndPay() {
  const [renewalFrequency, setRenewalFrequency] = useState('annual')

  function handlePayment() {
    console.log('Time to collect big $$')
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

        <div className='space-y-4 mb-8'>
          <h3 className='text-xl font-bold text-primary text-center'>
            Choose Your Plan
          </h3>

          <div className='grid grid-cols-2 gap-4'>
            {/* Monthly Option */}
            <div
              className={`card cursor-pointer transition-all ${
                renewalFrequency === 'monthly'
                  ? 'ring-2 ring-primary bg-primary/5'
                  : 'hover:shadow-lg'
              }`}
              onClick={() => setRenewalFrequency('monthly')}
            >
              <div className='text-center'>
                <h4 className='text-lg font-bold text-primary mb-2'>Monthly</h4>
                <div className='text-3xl font-bold text-primary mb-1'>$11</div>
                <p className='text-muted-foreground text-sm'>per month</p>
              </div>
            </div>

            {/* Annual Option */}
            <div
              className={`card cursor-pointer transition-all ${
                renewalFrequency === 'annual'
                  ? 'ring-2 ring-primary bg-primary/5'
                  : 'hover:shadow-lg'
              }`}
              onClick={() => setRenewalFrequency('annual')}
            >
              <div className='text-center'>
                <h4 className='text-lg font-bold text-primary mb-2'>Annual</h4>
                <div className='text-3xl font-bold text-primary mb-1'>$111</div>
                <p className='text-muted-foreground text-sm'>per year</p>
                <div className='text-xs text-green-600 font-semibold mt-1'>
                  Save 15%
                </div>
              </div>
            </div>
          </div>
          <div className='mx-auto'>
            <AtomicButton
              label={'Go with ' + renewalFrequency}
              onClick={handlePayment}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PickAndPay
