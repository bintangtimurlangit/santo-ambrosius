export interface WAMArticle {
  id: string
  title: string
  slug: string
  description: string
  issueNumber: number
  edition: string
  publishedDate: string
  fileSize: number

  coverImage?: {
    id: string
    filename: string
    url: string
    width: number
    height: number
  }
  pdfFile?: {
    id: string
    filename: string
    url: string
    width?: number
    height?: number
  }
  status: 'draft' | 'published' | 'archived'
}

/**
 * Fetch WAM articles from Payload CMS
 */
export async function getWAMData(options?: {
  limit?: number
  status?: 'draft' | 'published' | 'archived'
}): Promise<WAMArticle[]> {
  try {
    const searchParams = new URLSearchParams()
    if (options?.limit) searchParams.set('limit', options.limit.toString())
    if (options?.status) searchParams.set('where[status][equals]', options.status)

    // Always fetch published articles by default
    if (!options?.status) {
      searchParams.set('where[status][equals]', 'published')
    }

    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/wam?${searchParams.toString()}`)
    if (!response.ok) {
      console.error('Failed to fetch WAM:', response.statusText)
      return []
    }

    const data = await response.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching WAM:', error)
    return []
  }
}

/**
 * Fetch a single WAM article by slug
 */
export async function getWAMBySlug(slug: string): Promise<WAMArticle | null> {
  try {
    const searchParams = new URLSearchParams()
    searchParams.set('where[slug][equals]', slug)
    searchParams.set('where[status][equals]', 'published')
    searchParams.set('limit', '1')
    searchParams.set('depth', '1') // Ensure relations (coverImage, pdfFile) are populated

    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const url = `${baseUrl}/api/wam?${searchParams.toString()}`

    const response = await fetch(url)
    if (!response.ok) {
      console.error('Failed to fetch WAM by slug:', response.statusText)
      return null
    }

    const data = await response.json()
    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching WAM by slug:', error)
    return null
  }
}

/**
 * Format date to Indonesian locale
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
