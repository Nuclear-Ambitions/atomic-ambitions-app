import { useState } from 'react'
import AtomicButton from './AtomicButton'

export default function PlanOptions({
  onSelect,
}: {
  onSelect: (interval: string) => void
}) {
  const [renewalInterval, setRenewalInterval] = useState('year')

  const plans = [
    {
      key: 'month',
      label: 'Monthly',
      amount: '$11',
      frequency: 'per month',
      discountLabel: null,
    },
    {
      key: 'year',
      label: 'Annual',
      amount: '$111',
      frequency: 'per year',
      discountLabel: 'Save 15%',
    },
  ]

  function getPlanLabel(interval: string) {
    return interval === 'month' ? 'Monthly' : 'Annual'
  }

  const planItems = plans.map((plan) => (
    <div
      key={plan.key}
      className={`card cursor-pointer transition-all ${
        renewalInterval === plan.key
          ? 'ring-2 ring-primary bg-primary/5'
          : 'hover:shadow-lg'
      }`}
      onClick={() => setRenewalInterval(plan.key)}
    >
      <div className='text-center'>
        <h4 className='text-lg font-bold text-primary mb-2'>{plan.label}</h4>
        <div className='text-3xl font-bold text-primary mb-1'>
          {plan.amount}
        </div>
        <p className='text-muted-foreground text-sm'>{plan.frequency}</p>
        {plan.discountLabel && (
          <div className='text-xs text-green-600 font-semibold mt-1'>
            {plan.discountLabel}
          </div>
        )}
      </div>
    </div>
  ))

  return (
    <div className='space-y-4 mb-8'>
      <h3 className='text-xl font-bold text-primary text-center'>
        Choose Your Plan
      </h3>
      <div className='grid grid-cols-2 gap-4'>{planItems}</div>
      <div className='mx-auto'>
        <AtomicButton
          label={'Go with ' + getPlanLabel(renewalInterval)}
          onClick={() => onSelect(renewalInterval)}
        />
      </div>
    </div>
  )
}
