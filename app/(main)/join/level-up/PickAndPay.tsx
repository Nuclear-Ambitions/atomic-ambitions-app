import { useState } from 'react'
import Benefits from './Benefits'
import PlanOptions from './PlanOptions'

type RenewalInterval = 'monthly' | 'annual'

function PickAndPay() {
  const [prodOption, setProdOption] = useState('')

  function handlePayment(renewal: string) {
    console.log('Time to collect big $$: ' + renewal)
    setProdOption(renewal)
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
