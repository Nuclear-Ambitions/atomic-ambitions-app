import { useState, useEffect } from 'react'
import { format, add } from 'date-fns'

function RenewalDate() {
  const [date, setDate] = useState('')
  const isAnnual = true

  useEffect(() => {
    const expiration = add(new Date(), isAnnual ? { years: 1 } : { months: 1 })
    setDate(format(expiration, 'MMMM d, yyyy'))
  }, [])

  return (
    <div>
      <p>
        Your membership will renew on{' '}
        <span className='font-bold'>{date || 'thinking...'}</span>.
      </p>
    </div>
  )
}

function Confirmation() {
  return (
    <>
      <p>Thanks for subscribing.</p>
      <RenewalDate />
    </>
  )
}

export default Confirmation
