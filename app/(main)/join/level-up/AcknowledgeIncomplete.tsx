import Link from 'next/link'

// TODO: Add but that goes to feedback form

function AcknowledgeIncomplete({ onTryAgain }: { onTryAgain: () => void }) {
  return (
    <div className='min-h-screen bg-background py-12'>
      <div className='container mx-auto px-6'>
        <div className='max-w-2xl mx-auto'>
          <div className='text-center mb-8 space-y-8'>
            <h1 className='text-4xl font-bold text-primary mb-8'>
              Payment Incomplete
            </h1>
            <p className='text-xl text-muted-foreground'>
              It looks like you decided not to complete your payment.
            </p>
            <p>No worries. You can always try again later.</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
              <div className='text-center flex flex-col items-center gap-4 border border-black rounded-lg p-8'>
                <p>Do you want to try again?</p>
                <Link href='/join/level-up' onClick={onTryAgain}>
                  <button className='btn btn-primary px-8'>Try Again</button>
                </Link>
              </div>

              <div className='text-center flex flex-col items-center gap-4 border border-black rounded-lg p-8'>
                <p>See what you can do with your Explorer membership.</p>
                <Link href='/clubroom'>
                  <button className='btn btn-primary px-8'>
                    Visit the Clubroom
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AcknowledgeIncomplete
