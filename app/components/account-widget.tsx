'use client'

import { useState, useRef, useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { useAuthStore } from '../lib/stores/auth-store'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import SignInDialog from './sign-in-dialog'

interface AccountWidgetProps {
  className?: string
}

export function AccountWidget({ className = '' }: AccountWidgetProps) {
  const {
    isSignedIn,
    user,
    signOut: authSignOut,
    checkAuthStatus,
  } = useAuthStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showSignInDialog, setShowSignInDialog] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Check auth status on mount
  useEffect(() => {
    console.log('🔐 [ACCOUNT WIDGET] Mounted, checking auth status')
    checkAuthStatus()
  }, [checkAuthStatus])

  // Log when user state changes and check for membership
  useEffect(() => {
    console.log('🔐 [ACCOUNT WIDGET] User state changed:', {
      isSignedIn,
      hasUser: !!user,
      userId: user?.id,
      userName: user?.name,
      userAlias: user?.alias,
      userEmail: user?.email,
      membershipLevel: user?.membership?.level,
      membershipStatus: user?.membership?.status,
    })

    // If user is signed in but doesn't have a membership, redirect to registration
    if (
      isSignedIn &&
      user &&
      (!user.membership || user.membership.level === 'unknown')
    ) {
      console.log(
        '🔐 [ACCOUNT WIDGET] User has no membership, redirecting to registration'
      )
      // Close the sign-in dialog if it's open
      setShowSignInDialog(false)
      // Redirect to registration
      window.location.href = '/join/registration'
    }
  }, [isSignedIn, user])

  // Check auth status when page becomes visible (useful for magic link flow)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkAuthStatus()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [checkAuthStatus])

  // Handle sign out
  const handleSignOut = async () => {
    try {
      // Use NextAuth's signOut which properly clears the session cookie
      await signOut({ redirect: false })

      // Clear the auth store
      authSignOut()
      setIsDropdownOpen(false)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Generate initials from name
  const getInitials = (name: string) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Get display name for initials
  const getDisplayName = () => {
    return user?.name || user?.alias || user?.email?.split('@')[0] || 'U'
  }

  if (!isSignedIn) {
    return (
      <>
        <div className={`flex items-center ${className}`}>
          <button
            onClick={() => setShowSignInDialog(true)}
            className='btn btn-primary px-6 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
            aria-label='Sign in to your account'
          >
            Sign In
          </button>
        </div>
        {showSignInDialog && (
          <SignInDialog onClose={() => setShowSignInDialog(false)} />
        )}
      </>
    )
  }

  return (
    <div
      className={`relative flex items-center ${className}`}
      ref={dropdownRef}
    >
      {/* Avatar Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className='flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-cherenkov to-primary text-primary-foreground font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-2 border-transparent hover:border-cherenkov/30'
        aria-label='Open account menu'
        aria-expanded={isDropdownOpen}
      >
        <span className='text-sm font-bold'>
          {getInitials(getDisplayName())}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className='absolute right-0 top-12 w-56 bg-popover border border-border rounded-lg shadow-lg z-50 animate-in slide-in-from-top-2 duration-200'>
          {/* User Info Header */}
          <div className='px-4 py-3 border-b border-border'>
            <p className='text-sm font-medium text-popover-foreground'>
              {user?.name || user?.alias || user?.email || 'Unknown User'}
            </p>
            {user?.email && !user?.name && !user?.alias && (
              <p className='text-xs text-muted-foreground truncate'>
                {user.email}
              </p>
            )}
            {user?.membership &&
              user.membership.level !== 'unknown' &&
              user.membership.status !== 'unknown' && (
                <p className='text-xs text-muted-foreground'>
                  {user.membership.level} • {user.membership.status}
                </p>
              )}
          </div>

          {/* Menu Items */}
          <div className='py-2'>
            <a
              href='/account'
              className='flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-150'
              onClick={() => setIsDropdownOpen(false)}
            >
              <Icon
                icon='ph:user-duotone'
                width={16}
                className='mr-3 text-muted-foreground'
              />
              Account
            </a>

            <a
              href='/settings'
              className='flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-150'
              onClick={() => setIsDropdownOpen(false)}
            >
              <Icon
                icon='ph:gear-six-duotone'
                width={16}
                className='mr-3 text-muted-foreground'
              />
              Settings
            </a>

            <a
              href='/profile'
              className='flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-150'
              onClick={() => setIsDropdownOpen(false)}
            >
              <Icon
                icon='ph:user-circle-duotone'
                width={16}
                className='mr-3 text-muted-foreground'
              />
              Profile
            </a>

            <div className='border-t border-border my-1'></div>

            <button
              onClick={handleSignOut}
              className='flex items-center w-full px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors duration-150'
              aria-label='Sign out of your account'
            >
              <Icon icon='ph:sign-out-duotone' width={16} className='mr-3' />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
