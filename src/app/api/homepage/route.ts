import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'homepage',
      limit: 1,
    })

    const homepageData = result.docs[0] || null

    return NextResponse.json({
      success: true,
      data: homepageData,
    })
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch homepage data',
      },
      { status: 500 },
    )
  }
}
