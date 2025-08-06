import type { Media } from '@/payload-types'
import type { SejarahParoki } from '@/payload-types'

export type SejarahParokiData = SejarahParoki

export function getMediaURL(media: Media | string | undefined | null): string {
  if (!media) return ''

  if (typeof media === 'string') {
    return media
  }

  if (typeof media === 'object' && media?.url) {
    return media.url
  }

  return ''
}

export async function getSejarahParokiData(): Promise<SejarahParokiData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/sejarah-paroki?limit=1`, {
      cache: 'no-store', // Always fetch fresh data
    })

    if (!response.ok) {
      console.error('Failed to fetch sejarah paroki data:', response.statusText)
      return null
    }

    const result = await response.json()
    // Payload's built-in API returns documents in a 'docs' array
    return result.docs && result.docs.length > 0 ? result.docs[0] : null
  } catch (error) {
    console.error('Error fetching sejarah paroki data:', error)
    return null
  }
}
