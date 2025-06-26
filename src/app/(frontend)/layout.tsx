import React from 'react'
import Navbar from '@/components/Navbar'

export default async function FrontendLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}
