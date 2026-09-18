import { formatAuthorNames } from '~/components/author-avatars'
import { resolveAuthors } from '~/lib/authors'
import { getPublicUrl } from '~/lib/get-public-url'
import { blogs } from '~/lib/source'

export const dynamic = 'force-static'

const SITE_TITLE = 'Ark UI Blog'
const SITE_DESCRIPTION = 'Articles and release notes from the Ark UI team.'

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '&':
        return '&amp;'
      case "'":
        return '&apos;'
      default:
        return '&quot;'
    }
  })

const toItem = (blog: (typeof blogs)[number]) => {
  const url = getPublicUrl(`/blog/${blog.slug}`)
  const authors = resolveAuthors(blog.author)
  const creator = authors.length ? formatAuthorNames(authors.map((a) => a.name)) : undefined
  return [
    '    <item>',
    `      <title>${escapeXml(blog.title)}</title>`,
    `      <link>${url}</link>`,
    `      <guid isPermaLink="true">${url}</guid>`,
    `      <pubDate>${new Date(blog.date).toUTCString()}</pubDate>`,
    blog.description && `      <description>${escapeXml(blog.description)}</description>`,
    creator && `      <dc:creator>${escapeXml(creator)}</dc:creator>`,
    ...(blog.tags ?? []).map((tag) => `      <category>${escapeXml(tag)}</category>`),
    '    </item>',
  ]
    .filter(Boolean)
    .join('\n')
}

export function GET() {
  const items = [...blogs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(toItem)
    .join('\n')

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(SITE_TITLE)}</title>`,
    `    <link>${getPublicUrl('/blog')}</link>`,
    `    <description>${escapeXml(SITE_DESCRIPTION)}</description>`,
    '    <language>en</language>',
    `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${getPublicUrl('/rss.xml')}" rel="self" type="application/rss+xml" />`,
    items,
    '  </channel>',
    '</rss>',
  ].join('\n')

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
