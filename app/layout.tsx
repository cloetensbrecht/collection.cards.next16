import {cms} from '@/cms'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import ThemeProvider from '@/components/themeprovider/ThemeProvider'
import {Analytics} from '@vercel/analytics/next'
import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata} from 'next'
import {Geist, Geist_Mono} from 'next/font/google'
import {Toaster} from 'sonner'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Collection.cards - TCG Collection Manager',
  description: 'Manage your TCG collection online',
  other: {
    'apple-mobile-web-app-capable': 'yes'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="flex flex-col items-center justify-center font-sans pb-12 md:pb-18 lg:pb-24 bg-linear-to-b from-zinc-50 to-background dark:from-zinc-900">
            {children}
          </div>
          <Toaster />
          <cms.previews widget />
          <Analytics />
          <SpeedInsights />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
