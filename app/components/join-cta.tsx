import Link from 'next/link'

export default function JoinCta({
  title = 'Join Us',
  encouragement = 'To get started, click the button. We will help sign in and create your free account.',
  buttonText = 'Sign me in, please.',
  className = '',
}: {
  title?: string;
  encouragement?: string;
  buttonText?: string;
  className?: string;
}) {
  return (
    <div className={`card max-w-md mx-auto text-center ${className}`}>
      <h3 className='text-xl font-semibold text-primary mb-4'>{title}</h3>
      <p className='text-foreground my-6'>{encouragement}</p>
      <Link href='/join/registration' className='btn btn-primary m-4'>
        {buttonText}
      </Link>
    </div>
  )
}
