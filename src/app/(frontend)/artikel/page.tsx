import React from 'react'
import { Metadata } from 'next'
import ArtikelTerkiniClient from './ArtikelTerkiniClient'

export const metadata: Metadata = {
  title: 'Artikel Terkini',
  description:
    'Baca artikel terbaru dari seluruh bidang di Gereja Santo Ambrosius. Berita, renungan, WAM, dan WAB.',
  keywords: ['artikel gereja', 'berita paroki', 'renungan', 'wam', 'wab', 'santo ambrosius'],
  openGraph: {
    title: 'Artikel Terkini - Gereja Santo Ambrosius',
    description:
      'Baca artikel terbaru dari seluruh bidang di Gereja Santo Ambrosius. Berita, renungan, WAM, dan WAB.',
    url: '/artikel',
  },
  twitter: {
    title: 'Artikel Terkini - Gereja Santo Ambrosius',
    description:
      'Baca artikel terbaru dari seluruh bidang di Gereja Santo Ambrosius. Berita, renungan, WAM, dan WAB.',
  },
  alternates: {
    canonical: '/artikel',
  },
}

export default function ArtikelTerkiniPage() {
  return <ArtikelTerkiniClient />
}
