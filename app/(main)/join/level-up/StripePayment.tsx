import {
  CheckoutProvider,
  PaymentElement,
} from '@stripe/react-stripe-js/checkout'
import { loadStripe } from '@stripe/stripe-js'
import { useMemo } from 'react'

const PaymentForm = () => (
  <section>
    <div className='product'>
      <div className='description'>
        <h3>Monthly</h3>
        <h5>$11.00 / month</h5>
      </div>
    </div>
    <form>
      <PaymentElement />
      <button>Checkout</button>
    </form>
  </section>
)

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

const StripePayment = ({ onPayment }: { onPayment: () => void }) => {
  const promise = useMemo(() => {
    return fetch(
      '/create-checkout-session',
      {
        method: 'POST',
      },
      []
    )
  })

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{ clientSecret: promise }}
    >
      <div className='text-center'>
        <h2>Pay It!</h2>
        <PaymentForm />
      </div>
    </CheckoutProvider>
  )
}

export default StripePayment
