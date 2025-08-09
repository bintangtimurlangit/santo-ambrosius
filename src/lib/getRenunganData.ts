export interface RenunganArticle {
  id: string
  title: string
  slug: string
  description: string
  content: string
  author: string
  publishedDate: string
  readingTime: number

  featuredImage?: {
    id: string
    filename: string
    url: string
    width: number
    height: number
  }
  status: 'draft' | 'published' | 'archived'
}

/**
 * Fetch renungan articles from Payload CMS
 */
export async function getRenunganData(options?: {
  limit?: number
  status?: 'draft' | 'published' | 'archived'
}): Promise<RenunganArticle[]> {
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
    const response = await fetch(`${baseUrl}/api/renungan?${searchParams.toString()}`)
    if (!response.ok) {
      console.error('Failed to fetch renungan:', response.statusText)
      return []
    }

    const data = await response.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching renungan:', error)
    return []
  }
}

/**
 * Fetch a single renungan article by slug
 */
export async function getRenunganBySlug(slug: string): Promise<RenunganArticle | null> {
  try {
    const searchParams = new URLSearchParams()
    searchParams.set('where[slug][equals]', slug)
    searchParams.set('where[status][equals]', 'published')
    searchParams.set('limit', '1')

    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const url = `${baseUrl}/api/renungan?${searchParams.toString()}`
    console.log('Fetching renungan with URL:', url)

    const response = await fetch(url)
    if (!response.ok) {
      console.error('Failed to fetch renungan by slug:', response.statusText)
      return null
    }

    const data = await response.json()
    console.log('API response:', data)
    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching renungan by slug:', error)
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
