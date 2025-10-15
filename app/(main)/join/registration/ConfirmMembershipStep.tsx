'use client'

import Link from 'next/link'
import FeatureCard from '@/components/feature-card'
import { StepProps } from './types'

const ConfirmMembershipStep: React.FC<StepProps> = () => {
  return (
    <div className='max-w-4xl mx-auto'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold text-primary mb-4'>
          Thanks for joining!
        </h2>
        <p className='text-muted-foreground text-lg mb-6'>
          Your membership is now active.
        </p>
        <div className='w-32 h-32 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center'>
          <span className='text-6xl'>🎉</span>
        </div>
      </div>

      <div className='bg-muted/50 border border-muted rounded-lg p-6 mb-8 text-center md:max-w-1/2 mx-auto'>
        <h4 className='text-lg font-semibold text-primary mb-3'>
          Explorer Benefits Unlocked
        </h4>
        <div className='space-y-2 grid grid-cols-1'>
          <div className='flex items-center space-x-3'>
            <span className='text-green-500 font-bold'>✓</span>
            <span className='text-foreground'>
              Participate in public forums
            </span>
          </div>
          <div className='flex items-center space-x-3'>
            <span className='text-green-500 font-bold'>✓</span>
            <span className='text-foreground'>
              Unlimited access to learning
            </span>
          </div>
          <div className='flex items-center space-x-3'>
            <span className='text-green-500 font-bold'>✓</span>
            <span className='text-foreground'>
              Basic listing in member directory
            </span>
          </div>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-4 justify-center'>
        <Link href='/clubroom'>
          <button className='btn btn-primary px-8'>Head to the Clubroom</button>
        </Link>
        <Link href='/clubroom/profile'>
          <button className='btn btn-outline px-8'>Set Up Your Profile</button>
        </Link>
      </div>

      <div className='mb-12 mt-18'>
        <h3 className='text-2xl font-bold text-primary mb-6 text-center'>
          Can we interest you in one of these?
        </h3>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <FeatureCard
            title='Club Atomic'
            description='The best place to start exploring'
            icon='🎉'
            href='/clubroom'
          />
          <FeatureCard
            title='Adventures'
            description='Explore interactive learning experiences'
            icon='🥾'
            href='/adventures'
          />
          <FeatureCard
            title='Atomic Flux'
            description='Stay updated with the latest news'
            icon='⚡'
            href='/flux'
          />
          <FeatureCard
            title='Lessons'
            description='Learn from expert-led educational content'
            icon='📚'
            href='/lessons'
          />
          <FeatureCard
            title='Alchemy Lab'
            description='Hands-on experiments and simulations'
            icon='🧪'
            href='/alchemy-lab'
          />
          <FeatureCard
            title='Atomic Who'
            description='Connect with other community members'
            icon='👥'
            href='/whos-who'
          />
        </div>
      </div>
    </div>
  )
}

export default ConfirmMembershipStep
