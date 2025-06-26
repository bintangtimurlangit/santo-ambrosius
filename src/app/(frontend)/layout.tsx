import React from 'react'
import '../globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  description: 'Website resmi Gereja Santo Ambrosius',
  title: 'Gereja Santo Ambrosius',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
