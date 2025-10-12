'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@iconify/react'
import { useSession } from 'next-auth/react'

interface NavigationItem {
  href: string
  label: string
  icon?: string
  description?: string
  requiredRole?: string
}

// Base navigation items that are always visible
const navigationItems: NavigationItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: 'ph:house-duotone',
    description: 'Main page',
  },
  {
    href: '/adventures',
    label: 'Adventure',
    icon: 'ph:person-simple-hike-duotone',
    description: 'Explore and discover',
  },
  {
    href: '/flux',
    label: 'Atomic Flux',
    icon: 'ph:lightning-duotone',
    description: 'Social idea exchange ',
  },
  {
    href: '/lessons',
    label: 'Atomic Learning',
    icon: 'ph:book-duotone',
    description: 'Learn about atomic energy',
  },
  {
    href: '/clubroom',
    label: 'Clubroom',
    icon: 'ph:user-duotone',
    description: 'Members start here',
    requiredRole: 'member',
  },
  {
    href: '/join',
    label: 'Join',
    icon: 'ph:handshake-duotone',
    description: 'Benefits of membership',
  },
  {
    href: '/whos-who',
    label: 'Atomic Who',
    description: 'Meet the community',
    icon: 'ph:user-rectangle-duotone',
  },
  {
    href: '/a-neutron-tale',
    label: "A Neutron's Tale",
    icon: 'ph:circle-duotone',
    description: 'A quickie ',
  },
  {
    href: '/art-gallery',
    label: 'Art Gallery',
    icon: 'ph:image-duotone',
    description: 'Flux-inspired eye candy',
  },
  {
    href: '/admin-console',
    label: 'Atomic Admin',
    icon: 'ph:gear-six-duotone',
    description: 'For overlords only',
    requiredRole: 'admin',
  },
  {
    href: '/scratch/style-review',
    label: 'Style Review',
    icon: 'ph:palette-duotone',
    description: 'UI theme test pattern',
    requiredRole: 'admin',
  },
  {
    href: '/scratch/data',
    label: 'Data Access Testing',
    icon: 'ph:database-duotone',
    description: 'Data access tests',
    requiredRole: 'admin',
  },
]

export default function DynamicMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const roles = useSession().data?.user?.summary?.roles

  useEffect(() => {
    console.log('roles', roles)
  }, [roles])

  // Combine base and conditional navigation items
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className='relative'>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className='flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2 rounded-md'
        aria-label='Toggle navigation menu'
        aria-expanded={isOpen}
      >
        <span
          className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out ${
            isOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out ${
            isOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40'
            onClick={closeMenu}
          />

          {/* Menu Panel */}
          <div className='absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden'>
            <div className='p-4'>
              <h3 className='text-lg font-semibold text-popover-foreground mb-4 border-b border-border pb-2'>
                Navigation
              </h3>

              <nav className='space-y-1'>
                {navigationItems.map((item) => {
                  if (
                    item.requiredRole &&
                    roles != null &&
                    !roles.includes(item.requiredRole)
                  ) {
                    return null
                  }

                  const isActive = pathname === item.href

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className={`block px-3 py-2 rounded-md transition-all duration-200 group ${
                        isActive
                          ? 'bg-highlight text-highlight-background'
                          : 'text-popover-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <div className='flex items-start gap-3'>
                        {/* Icon column - fixed width for alignment */}
                        <div className='flex-shrink-0 w-6 h-6 flex items-center justify-center'>
                          {item.icon && (
                            <Icon
                              icon={item.icon}
                              width={20}
                              className={`${
                                isActive
                                  ? 'text-highlight-background'
                                  : 'text-muted-foreground group-hover:text-foreground'
                              }`}
                            />
                          )}
                        </div>

                        {/* Text column - flexible width */}
                        <div className='flex-1 min-w-0'>
                          <span className='font-medium block'>
                            {item.label}
                          </span>
                          {item.description && (
                            <span
                              className={`text-sm block ${
                                isActive
                                  ? 'text-highlight-background/80'
                                  : 'text-muted-foreground group-hover:text-foreground/70'
                              }`}
                            >
                              {item.description}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Footer */}
            <div className='px-4 py-3 bg-muted border-t border-border'>
              <p className='text-xs text-muted-foreground text-center'>
                Enjoy Atomic Ambitions
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
