import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')
  const secret = searchParams.get('secret')

  if (!url) {
    return new Response('URL is required', { status: 400 })
  }

  // Check the secret to ensure this is a valid request
  if (secret !== process.env.PAYLOAD_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }

  // Enable draft mode
  ;(await draftMode()).enable()

  // Redirect to the preview URL
  redirect(url)
}
