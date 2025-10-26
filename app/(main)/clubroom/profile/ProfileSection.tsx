'use client'

import { Icon } from '@iconify/react'
import { ReactNode } from 'react'

interface ProfileSectionProps {
  icon: string
  title: string
  children: ReactNode
  action?: ReactNode
}

export default function ProfileSection({
  icon,
  title,
  children,
  action,
}: ProfileSectionProps) {
  return (
    <div className='card p-6'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold text-highlight flex items-center'>
          <Icon icon={icon} width={24} className='mr-2' />
          {title}
        </h2>
        {action}
      </div>
      {children}
    </div>
  )
}
