export interface NewsArticle {
  id: string
  title: string
  slug: string
  description: string
  saptaBidang: string
  content: string
  author: string
  publishedDate: string
  readingTime: number
  featured: boolean
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
 * Fetch news articles from Payload CMS
 */
export async function getNewsData(options?: {
  limit?: number
  status?: 'draft' | 'published' | 'archived'
  saptaBidang?: string
  featured?: boolean
}): Promise<NewsArticle[]> {
  try {
    const searchParams = new URLSearchParams()
    if (options?.limit) searchParams.set('limit', options.limit.toString())
    if (options?.status) searchParams.set('where[status][equals]', options.status)
    if (options?.saptaBidang) searchParams.set('where[saptaBidang][equals]', options.saptaBidang)
    if (options?.featured !== undefined)
      searchParams.set('where[featured][equals]', options.featured.toString())

    // Always fetch published articles by default
    if (!options?.status) {
      searchParams.set('where[status][equals]', 'published')
    }

    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/news?${searchParams.toString()}`)
    if (!response.ok) {
      console.error('Failed to fetch news:', response.statusText)
      return []
    }

    const data = await response.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

/**
 * Fetch a single news article by slug
 */
export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    const searchParams = new URLSearchParams()
    searchParams.set('where[slug][equals]', slug)
    searchParams.set('where[status][equals]', 'published')
    searchParams.set('limit', '1')

    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const url = `${baseUrl}/api/news?${searchParams.toString()}`
    console.log('Fetching article with URL:', url)

    const response = await fetch(url)
    if (!response.ok) {
      console.error('Failed to fetch news by slug:', response.statusText)
      return null
    }

    const data = await response.json()
    console.log('API response:', data)
    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching news by slug:', error)
    return null
  }
}

/**
 * Get Sapta Bidang label from value
 */
export function getSaptaBidangLabel(value: string): string {
  const labels: Record<string, string> = {
    pewartaan: 'Pewartaan',
    pelayanan: 'Pelayanan',
    persekutuan: 'Persekutuan',
    peribadatan: 'Peribadatan',
    pemerhati: 'Pemerhati',
    pitk: 'PITK',
    okk: 'OKK',
  }
  return labels[value] || value
}

/**
 * Get Sapta Bidang color classes
 */
export function getSaptaBidangColor(value: string): string {
  const colors: Record<string, string> = {
    pewartaan: 'bg-blue-200 text-blue-700',
    pelayanan: 'bg-green-200 text-green-700',
    persekutuan: 'bg-purple-200 text-purple-700',
    peribadatan: 'bg-yellow-200 text-yellow-700',
    pemerhati: 'bg-red-200 text-red-700',
    pitk: 'bg-indigo-200 text-indigo-700',
    okk: 'bg-pink-200 text-pink-700',
  }
  return colors[value] || 'bg-gray-200 text-gray-700'
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
