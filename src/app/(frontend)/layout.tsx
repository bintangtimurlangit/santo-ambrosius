import React from 'react'
import '@/styles/global.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: {
    default: 'Gereja Santo Ambrosius',
    template: '%s | Gereja Santo Ambrosius',
  },
  description:
    'Paguyuban umat beriman yang peduli, berbagi dan merakyat. Website resmi Gereja Santo Ambrosius Villa Melati Mas, Serpong Utara.',
  keywords: [
    'gereja katolik',
    'santo ambrosius',
    'villa melati mas',
    'serpong',
    'tangerang selatan',
    'paroki',
    'umat katolik',
  ],
  authors: [{ name: 'Gereja Santo Ambrosius' }],
  creator: 'Gereja Santo Ambrosius',
  publisher: 'Gereja Santo Ambrosius',
  manifest: '/site.webmanifest',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://santoambrosius.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: 'Gereja Santo Ambrosius',
    title: 'Gereja Santo Ambrosius',
    description:
      'Paguyuban umat beriman yang peduli, berbagi dan merakyat. Website resmi Gereja Santo Ambrosius Villa Melati Mas.',
    images: [
      {
        url: '/logo.png',
        width: 348,
        height: 114,
        alt: 'Logo Gereja Santo Ambrosius',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gereja Santo Ambrosius',
    description: 'Paguyuban umat beriman yang peduli, berbagi dan merakyat.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
