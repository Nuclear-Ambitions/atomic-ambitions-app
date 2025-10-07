import type { Metadata } from 'next'
import { Orbitron, Roboto, Courier_Prime } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './theme-context'

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
})

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

const courier_prime = Courier_Prime({
  variable: '--font-courier-prime',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Atomic Ambitions',
  description:
    'The platform for fans of atoms and all they can do. Thrive with us.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${orbitron.variable} ${roboto.variable} ${courier_prime.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
