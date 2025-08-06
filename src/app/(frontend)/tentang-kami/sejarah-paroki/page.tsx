import React from 'react'
import { getSejarahParokiData } from '@/lib/getSejarahParokiData'
import SejarahParokiHero from '@/components/SejarahParokiHero'
import SejarahParokiContent from '@/components/SejarahParokiContent'

export default async function SejarahParokiPage() {
  const data = await getSejarahParokiData()

  return (
    <div className="min-h-screen">
      {/* Gradient Container */}
      <div
        className="mx-2 rounded-b-2xl shadow-sm"
        style={{
          background:
            'linear-gradient(to bottom, rgb(186 230 253) 5%, rgb(186 230 253) 3%, white 20%, rgb(249 250 251) 100%)',
        }}
      >
        {/* Hero Section */}
        <SejarahParokiHero data={data?.heroSection} />

        {/* Main Content Section */}
        <SejarahParokiContent data={data} />
      </div>
    </div>
  )
}
