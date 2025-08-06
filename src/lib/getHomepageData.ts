import type { Homepage, Media } from '@/payload-types'

export async function getHomepageData(): Promise<Homepage | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/homepage?limit=1`,
      {
        next: { revalidate: 60 }, // Cache for 60 seconds
      },
    )

    if (!response.ok) {
      throw new Error('Failed to fetch homepage data')
    }

    const result = await response.json()
    // Payload's built-in API returns documents in a 'docs' array
    return result.docs && result.docs.length > 0 ? result.docs[0] : null
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return null
  }
}

// Helper function to get media URL
export function getMediaURL(media: string | Media | null | undefined): string {
  if (typeof media === 'string') return media
  if (media?.url) return media.url
  if (media?.filename) return `/media/${media.filename}`
  return ''
}
