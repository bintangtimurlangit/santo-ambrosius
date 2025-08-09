export interface BeritaArticle {
  id: string
  title: string
  slug: string
  description: string
  saptaBidang: string
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
 * Fetch berita articles from Payload CMS
 */
export async function getBeritaData(options?: {
  limit?: number
  status?: 'draft' | 'published' | 'archived'
  saptaBidang?: string
}): Promise<BeritaArticle[]> {
  try {
    const searchParams = new URLSearchParams()
    if (options?.limit) searchParams.set('limit', options.limit.toString())
    if (options?.status) searchParams.set('where[status][equals]', options.status)
    if (options?.saptaBidang) searchParams.set('where[saptaBidang][equals]', options.saptaBidang)

    // Always fetch published articles by default
    if (!options?.status) {
      searchParams.set('where[status][equals]', 'published')
    }

    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/berita?${searchParams.toString()}`)
    if (!response.ok) {
      console.error('Failed to fetch berita:', response.statusText)
      return []
    }

    const data = await response.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching berita:', error)
    return []
  }
}

/**
 * Fetch a single berita article by slug
 */
export async function getBeritaBySlug(
  slug: string,
  isDraft: boolean = false,
): Promise<BeritaArticle | null> {
  try {
    const searchParams = new URLSearchParams()
    searchParams.set('where[slug][equals]', slug)
    searchParams.set('limit', '1')

    // If not in draft mode, only get published articles
    if (!isDraft) {
      searchParams.set('where[status][equals]', 'published')
    }

    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const url = `${baseUrl}/api/berita?${searchParams.toString()}`
    console.log('Fetching berita with URL:', url)

    const response = await fetch(url)
    if (!response.ok) {
      console.error('Failed to fetch berita by slug:', response.statusText)
      return null
    }

    const data = await response.json()
    console.log('API response:', data)
    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching berita by slug:', error)
    return null
  }
}

/**
 * Get Sapta Bidang label from value (updated with Serba-Serbi)
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
    'serba-serbi': 'Serba-Serbi',
  }
  return labels[value] || value
}

/**
 * Get Sapta Bidang color classes (updated with Serba-Serbi)
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
    'serba-serbi': 'bg-orange-200 text-orange-700',
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
