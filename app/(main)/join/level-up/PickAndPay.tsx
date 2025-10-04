import { useState } from 'react'
import Benefits from './Benefits'
import PlanOptions from './PlanOptions'
import AtomicButton from './AtomicButton'

function PickAndPay() {
  const [prodOption, setProdOption] = useState('')
  const [isGettingPayment, setIsGettingPayment] = useState(false)

  function handlePayment(renewal: string) {
    console.log('Time to collect big $$: ' + renewal)
    setProdOption(renewal)
    setIsGettingPayment(true)
  }

  return (
    <div className='min-h-screen max-w-4xl mx-auto bg-background py-12'>
      <h1 className='mb-6'>Become a Charter Member</h1>
      {isGettingPayment ? (
        <div className='text-center'>
          <h2>Get paid</h2>
          <AtomicButton
            label='Pay'
            onClick={() => {
              setIsGettingPayment(false)
            }}
          />
        </div>
      ) : (
        <div className='space-y-4'>
          <p className='text-center text-lg'>
            As a charter member, you help us power the platform that empowers
            the people. Your support matters.
          </p>
          <Benefits />
          <PlanOptions onSelect={handlePayment} />
        </div>
      )}
    </div>
  )
}

export default PickAndPay
