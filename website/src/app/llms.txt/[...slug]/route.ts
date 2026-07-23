import { notFound } from 'next/navigation'
import { getDoc } from '~/lib/docs'

interface RouteContext {
  params: Promise<{ slug: string[] }>
}

export async function GET(_request: Request, context: RouteContext) {
  const params = await context.params
  const doc = getDoc(params.slug.join('/'))

  if (!doc) {
    notFound()
  }

  return new Response(doc.content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
