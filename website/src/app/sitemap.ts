import { cacheLife } from 'next/cache'
import type { MetadataRoute } from 'next'
import { docsHref, frameworks, isDocAvailable } from '~/lib/frameworks'
import { getPublicUrl } from '~/lib/get-public-url'
import { getSidebarGroups } from '~/lib/sidebar'
import { blogs } from '~/lib/source'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  'use cache'
  cacheLife('hours')
  const staticPages = ['', '/blog', '/showcase', '/team', '/brand'].map((path) => ({
    url: getPublicUrl(path),
  }))

  const docsPages = getSidebarGroups()
    .flatMap((group) => group.items)
    .flatMap((page) =>
      frameworks
        .filter((framework) => isDocAvailable(framework, page.slug))
        .map((framework) => ({ url: getPublicUrl(docsHref(framework, page.slug)) })),
    )

  const blogPages = blogs.map((blog) => ({
    url: getPublicUrl(`/blog/${blog.slug}`),
    lastModified: new Date(blog.date),
  }))

  return [...staticPages, ...docsPages, ...blogPages]
}
