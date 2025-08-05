import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('Initializing Payload CMS...')
    const payload = await getPayload({ config })

    console.log('Fetching homepage data from collection...')
    const result = await payload.find({
      collection: 'homepage',
      limit: 1,
    })

    const homepageData = result.docs[0] || null

    if (!homepageData) {
      console.log('No homepage data found in collection')
      return NextResponse.json(
        {
          success: false,
          error: 'No homepage data found',
        },
        { status: 404 },
      )
    }

    console.log('Successfully fetched homepage data')
    return NextResponse.json({
      success: true,
      data: homepageData,
    })
  } catch (error) {
    console.error('Error in homepage API route:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    })

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch homepage data',
      },
      { status: 500 },
    )
  }
}
