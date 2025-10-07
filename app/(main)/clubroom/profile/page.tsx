'use client'

import { useAuthStore } from '../../../lib/stores/auth-store'
import { Icon } from '@iconify/react'
import Image from 'next/image'

export default function ProfilePage() {
  const { user } = useAuthStore()
  const profile = user?.profile

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        {/* Profile Header */}
        <div className='mb-8'>
          <div className='flex items-center space-x-4 mb-6'>
            {profile?.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                width={80}
                height={80}
                alt={user?.name || profile?.alias || 'Profile'}
                className='w-20 h-20 rounded-full object-cover border-4 border-primary'
              />
            ) : (
              <div className='w-20 h-20 rounded-full bg-gradient-to-br from-cherenkov to-primary flex items-center justify-center text-primary-foreground text-2xl font-bold'>
                {user?.name
                  ? user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                  : profile?.alias?.[0] || 'U'}
              </div>
            )}
            <div>
              <h1 className='text-3xl font-bold text-foreground flex items-center'>
                <Icon
                  icon='ph:user-circle-duotone'
                  className='w-8 h-8 mr-3 text-primary'
                />
                Atomic Profile
              </h1>
              <p className='text-muted-foreground'>
                Manage your account information and preferences
              </p>
            </div>
          </div>
        </div>

        {/* Coming Soon Message */}
        <div className='card p-8 text-center'>
          <div className='flex items-center justify-center w-16 h-16 bg-gradient-to-br from-muted to-muted/50 rounded-full mx-auto mb-4'>
            <Icon
              icon='ph:gear-duotone'
              className='w-8 h-8 text-muted-foreground'
            />
          </div>
          <h2 className='text-xl font-semibold text-highlight mb-2'>
            Make an Impression
          </h2>
          <p className='text-muted-foreground max-w-md mx-auto my-6'>
            Before long, you will able to shape your public profile. This is
            also where you can manage your preferences.
          </p>
          <p className='text-highlight max-w-md mx-auto my-6'>
            Check back soon.
          </p>
        </div>
      </div>
    </div>
  )
}
