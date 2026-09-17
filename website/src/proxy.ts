import { type NextRequest, NextResponse } from 'next/server'
import { defaultFramework, isFramework } from '~/lib/frameworks'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.endsWith('.mdx')) return NextResponse.next()

  const rest = pathname.split('/').filter(Boolean).slice(1)
  if (isFramework(rest[0])) return NextResponse.next()

  const slug = rest.length ? rest.join('/') : 'overview/getting-started'
  const url = request.nextUrl.clone()
  url.pathname = `/docs/${defaultFramework}/${slug}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/docs', '/docs/:path*'],
}
