import React from 'react'
import { Metadata } from 'next'
import KesulitanAksesClient from './KesulitanAksesClient'

export const metadata: Metadata = {
  title: 'Kesulitan Mengakses Situs?',
  description: 'Form pelaporan kendala akses situs web Gereja Santo Ambrosius.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/kesulitan-akses',
  },
}

export default function KesulitanAksesPage() {
  return <KesulitanAksesClient />
}
