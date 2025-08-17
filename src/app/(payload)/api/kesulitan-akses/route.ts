import config from '@payload-config'
import type { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import type { KesulitanAkse } from '@/payload-types'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config })

    // Clone the incoming request body as a FormData
    const formData = await req.formData()

    // Build data object for collection create
    const data: Partial<KesulitanAkse> = {
      namaLengkap: formData.get('namaLengkap') as string,
      email: formData.get('email') as string,
      whatsapp: (formData.get('whatsapp') as string) || undefined,
      jenisPerangkat: formData.get('jenisPerangkat') as 'desktop' | 'ponsel' | 'tablet',
      sistemOperasi: (formData.get('sistemOperasi') as string) || undefined,
      browser: (formData.get('browser') as string) || undefined,
      koneksi: (formData.get('koneksi') as string) || undefined,
      mulaiTerjadi: (formData.get('mulaiTerjadi') as string) || undefined,
      halaman: (formData.get('halaman') as string) || undefined,
      deskripsi: formData.get('deskripsi') as string,
    }

    // Map langkahDicoba[] from indexed or multi values
    const langkahDicoba: ('reload' | 'clear-cache' | 'other-browser' | 'incognito' | 'other-device' | 'disable-extensions')[] = []
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('langkahDicoba')) {
        if (typeof value === 'string') {
          const validValue = value as 'reload' | 'clear-cache' | 'other-browser' | 'incognito' | 'other-device' | 'disable-extensions'
          langkahDicoba.push(validValue)
        }
      }
    }
    if (langkahDicoba.length > 0) data.langkahDicoba = langkahDicoba

    // Handle optional file upload for screenshot using Payload REST-compatible upload
    const screenshot = formData.get('screenshot') as File | null
    if (screenshot) {
      // Upload to media collection first to get an ID
      const mediaRes = await payload.create({
        collection: 'media',
        data: { alt: 'screenshot-kendala' },
        file: {
          name: screenshot.name,
          size: screenshot.size,
          data: Buffer.from(await screenshot.arrayBuffer()),
          mimetype: screenshot.type,
        },
      })
      data.screenshot = mediaRes.id
    }

    const created = await payload.create({
      collection: 'kesulitan-akses',
      data: data as any, // Type assertion needed for Payload's strict typing
    })

    return new Response(JSON.stringify({ id: created.id }), {
      status: 201,
      headers: { 'content-type': 'application/json' },
    })
  } catch (err) {
    console.error('Kesulitan Akses submit error:', err)
    return new Response(err instanceof Error ? err.message : 'Internal Server Error', {
      status: 500,
    })
  }
}
