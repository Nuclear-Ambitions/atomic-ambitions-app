'use client'

import { signIn } from 'next-auth/react'
import { Icon } from '@iconify/react'

export default function SignIn() {
  const doSignIn = async (provider: string) => {
    await signIn(provider)
  }

  return (
    <div className='card max-w-md mx-auto'>
      <h4 className='text-center'>Sign in with your favorite service.</h4>
      <div className='flex flex-wrap gap-4 mt-6 justify-center'>
        <button
          onClick={() => doSignIn('twitter')}
          className='btn btn-primary flex items-center gap-2'
          type='submit'
        >
          <Icon icon='ph:x-logo' width={16} />X
        </button>
        <button
          onClick={() => doSignIn('google')}
          className='btn btn-primary flex items-center gap-2'
          type='submit'
        >
          <Icon icon='ph:google-logo' width={16} />
          Google
        </button>
        <button
          onClick={() => doSignIn('discord')}
          className='btn btn-primary flex items-center gap-2'
          type='submit'
        >
          <Icon icon='ph:discord-logo' width={16} />
          Discord
        </button>
        <button
          onClick={() => doSignIn('spotify')}
          className='btn btn-primary flex items-center gap-2'
          type='submit'
        >
          <Icon icon='ph:spotify-logo' width={16} />
          Spotify
        </button>
        <button
          onClick={() => doSignIn('apple')}
          className='btn btn-primary flex items-center gap-2'
          type='submit'
        >
          <Icon icon='ph:apple-logo' width={16} />
          Apple
        </button>
        <button
          onClick={() => doSignIn('linkedin')}
          className='btn btn-primary flex items-center gap-2'
          type='submit'
        >
          <Icon icon='ph:linkedin-logo' width={16} />
          LinkedIn
        </button>
        <button
          onClick={() => doSignIn('github')}
          className='btn btn-primary flex items-center gap-2'
          type='submit'
        >
          <Icon icon='ph:github-logo' width={16} />
          GitHub
        </button>
      </div>
    </div>
  )
}
