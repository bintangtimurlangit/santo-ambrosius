import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import type { SejarahParoki } from '@/payload-types'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })

    // Fetch the first (and should be only) sejarah-paroki document
    const results = await payload.find({
      collection: 'sejarah-paroki',
      limit: 1,
    })

    if (!results.docs || results.docs.length === 0) {
      // Return default data if no document exists
      return NextResponse.json({
        title: 'Sejarah Paroki Santo Ambrosius',
        heroSection: {
          title: 'Sejarah Paroki\nSanto Ambrosius',
          subtitle: 'Perjalanan iman yang dimulai sejak tahun yang penuh berkah',
        },
        content: {
          article: null,
          featuredImage: null,
          imageCaption: '',
          quote: {
            text: '',
            author: '',
          },
        },
      })
    }

    const data = results.docs[0] as SejarahParoki

    return NextResponse.json({
      title: data.title,
      heroSection: data.heroSection,
      content: data.content,
    })
  } catch (error) {
    console.error('Error fetching sejarah paroki data:', error)
    return NextResponse.json({ error: 'Failed to fetch sejarah paroki data' }, { status: 500 })
  }
}
