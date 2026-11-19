import { notFound } from 'next/navigation'
import { getDoc } from '~/lib/docs'
import { type Framework, frameworks } from '~/lib/frameworks'

interface RouteContext {
  params: Promise<{ slug: string[] }>
}

const isFramework = (value: string | null): value is Framework =>
  !!value && (frameworks as readonly string[]).includes(value)

export async function GET(request: Request, context: RouteContext) {
  const { slug } = await context.params
  const [first, ...rest] = slug
  const fromPath = isFramework(first) ? first : null
  const requested = new URL(request.url).searchParams.get('framework')
  const framework = fromPath ?? (isFramework(requested) ? requested : 'react')
  const doc = await getDoc((fromPath ? rest : slug).join('/'), framework)

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
