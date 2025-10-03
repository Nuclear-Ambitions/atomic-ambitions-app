import Link from 'next/link'

// Feature Card Component
export default function FeatureCard({
  title,
  description,
  icon,
  href,
}: {
  title: string;
  description: string;
  icon: string;
  href: string;
}) {
  return (
    <div className='card hover:shadow-lg transition-shadow'>
      <div className='text-center'>
        <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
          <span className='text-2xl'>{icon}</span>
        </div>
        <h3 className='text-xl font-semibold text-primary mb-3'>{title}</h3>
        <p className='text-muted-foreground'>{description}</p>
        <div className='mt-4'>
          <Link href={href} className='text-primary'>
            See More →
          </Link>
        </div>
      </div>
    </div>
  )
}
