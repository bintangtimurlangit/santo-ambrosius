import type { Media } from '@/payload-types'

// Type for Payload's Lexical rich text format
interface LexicalRichText {
  root: {
    type: string
    children: {
      type: string
      version: number
      text?: string
      [k: string]: unknown
    }[]
    direction: ('ltr' | 'rtl') | null
    format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
    indent: number
    version: number
  }
  [k: string]: unknown
}

export interface SejarahParokiData {
  title: string
  heroSection: {
    title: string
    subtitle?: string
    backgroundImage?: Media | string | null
  }
  content: {
    article: LexicalRichText | string | null // Rich text content
    featuredImage?: Media | string | null
    imageCaption?: string
    quote?: {
      text?: string
      author?: string
    }
  }
}

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
    const response = await fetch(`${baseUrl}/api/sejarah-paroki`, {
      cache: 'no-store', // Always fetch fresh data
    })

    if (!response.ok) {
      console.error('Failed to fetch sejarah paroki data:', response.statusText)
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching sejarah paroki data:', error)
    return null
  }
}
