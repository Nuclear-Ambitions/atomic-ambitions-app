import { ThemeToggle } from '@/components/theme-toggle'
import UserAccountWidget from '@/components/user-account-widget'
import DynamicMenu from '@/components/dynamic-menu'
import Image from 'next/image'

export default function AdminConsoleLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='min-h-screen flex flex-col'>
      <ThemeToggle />

      {/* Header */}
      <header className='border-b-2 border-border'>
        <div className='container mx-auto px-4'>
          <div className='flex justify-between'>
            <div className='flex items-center space-x-3'>
              <div className='rounded-lg flex'>
                <Image
                  src='/atomic-ambitions-logo-sq.png'
                  alt='Atomic Ambitions Logo'
                  width={75}
                  height={75}
                  className='min-w-16 min-h-16'
                />
              </div>
              <h1 className='text-2xl font-bold text-highlight'>
                Atomic Ambitions (Admin)
              </h1>
            </div>
            <div className='flex items-center space-x-4'>
              <DynamicMenu />
              <UserAccountWidget />
            </div>
          </div>
        </div>
      </header>

      {children}
      {/* Footer */}
      <footer className='py-8 border-t-2 border-border'>
        <div className='container mx-auto text-center'>
          <p className='text-lg'>©2025 Nuclear Ambitions LLC</p>
        </div>
      </footer>
    </div>
  )
}
