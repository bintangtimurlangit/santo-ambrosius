import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Homepage, Media } from '@/payload-types'

export async function getHomepageData(): Promise<Homepage | null> {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'homepage',
      limit: 1,
    })

    return result.docs[0] || null
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
