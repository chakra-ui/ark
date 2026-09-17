import { type NextRequest, NextResponse } from 'next/server'
import { defaultFramework, isFramework } from '~/lib/frameworks'

const fallbackSlug: Record<string, string> = {
  docs: 'overview/getting-started',
  examples: 'checkbox-group',
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.endsWith('.mdx')) return NextResponse.next()

  const [base, ...rest] = pathname.split('/').filter(Boolean)
  if (isFramework(rest[0])) return NextResponse.next()

  const slug = rest.length ? rest.join('/') : fallbackSlug[base]
  const url = request.nextUrl.clone()
  url.pathname = `/${base}/${defaultFramework}/${slug}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/docs', '/docs/:path*', '/examples', '/examples/:path*'],
}
