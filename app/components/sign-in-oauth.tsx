'use client'

import { signIn } from 'next-auth/react'
import {
  XLogoIcon,
  GoogleLogoIcon,
  DiscordLogoIcon,
  GithubLogoIcon,
  SpotifyLogoIcon,
  AppleLogoIcon,
  LinkedinLogoIcon,
} from '@phosphor-icons/react'

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
          <XLogoIcon className='w-4 h-4' />X
        </button>
        <button
          onClick={() => doSignIn('google')}
          className='btn btn-primary flex items-center gap-2'
          type='submit'
        >
          <GoogleLogoIcon className='w-4 h-4' />
          Google
        </button>
        <button
          onClick={() => doSignIn('discord')}
          className='btn btn-primary flex items-center gap-2'
          type='submit'
        >
          <DiscordLogoIcon className='w-4 h-4' />
          Discord
        </button>
        <button
          onClick={() => doSignIn('spotify')}
          className='btn btn-primary flex items-center gap-2'
          type='submit'
        >
          <SpotifyLogoIcon className='w-4 h-4' />
          Spotify
        </button>
        <button
          onClick={() => doSignIn('apple')}
          className='btn btn-primary flex items-center gap-2'
          type='submit'
        >
          <AppleLogoIcon className='w-4 h-4' />
          Apple
        </button>
        <button
          onClick={() => doSignIn('linkedin')}
          className='btn btn-primary flex items-center gap-2'
          type='submit'
        >
          <LinkedinLogoIcon className='w-4 h-4' />
          LinkedIn
        </button>
        <button
          onClick={() => doSignIn('github')}
          className='btn btn-primary flex items-center gap-2'
          type='submit'
        >
          <GithubLogoIcon className='w-4 h-4' />
          GitHub
        </button>
      </div>
    </div>
  )
}
