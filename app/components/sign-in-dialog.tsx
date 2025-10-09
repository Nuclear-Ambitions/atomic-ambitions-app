'use client'

import React from 'react'
import SignIn from './sign-in-oauth'
import MagicLinkSignIn from './sign-in-magic-link'
import { Icon } from '@iconify/react'

interface SignInDialogProps {
  onClose?: () => void
}

export default function SignInDialog({ onClose }: SignInDialogProps) {
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative'>
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className='absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors'
            aria-label='Close sign in dialog'
          >
            <Icon icon='ph:x-bold' width={24} />
          </button>
        )}

        {/* Dialog Content */}
        <div className='p-6'>
          <h2 className='text-2xl font-bold text-primary mb-4 text-center'>
            Sign In to Your Account
          </h2>
          <p className='text-muted-foreground mb-6 text-center'>
            Choose your preferred sign-in method to continue.
          </p>

          <div className='space-y-6'>
            <SignIn />
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-border'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-card text-muted-foreground'>Or</span>
              </div>
            </div>
            <MagicLinkSignIn />
          </div>
        </div>
      </div>
    </div>
  )
}
