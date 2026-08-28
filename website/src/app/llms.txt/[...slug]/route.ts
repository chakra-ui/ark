import { notFound } from 'next/navigation'
import { getDoc } from '~/lib/docs'
import { type Framework, frameworks } from '~/lib/frameworks'

interface RouteContext {
  params: Promise<{ slug: string[] }>
}

const isFramework = (value: string | null): value is Framework =>
  !!value && (frameworks as readonly string[]).includes(value)

export async function GET(request: Request, context: RouteContext) {
  const params = await context.params
  const requested = new URL(request.url).searchParams.get('framework')
  const doc = await getDoc(params.slug.join('/'), isFramework(requested) ? requested : 'react')

  if (!doc) {
    notFound()
  }

  return new Response(doc.content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
