import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'
import Providers from '@/redux/Providers'
import { Toaster } from 'react-hot-toast'
const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900']
})
export const metadata: Metadata = {
  title: 'Socialite',
  description: 'Generated by create next app',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={lato.className}>
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
