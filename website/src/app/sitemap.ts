import type { MetadataRoute } from 'next'
import { fetchExamples } from '~/lib/examples'
import { getPublicUrl } from '~/lib/get-public-url'
import { getSidebarGroups } from '~/lib/sidebar'
import { blogs } from '~/lib/source'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ['', '/blog', '/showcase', '/plus', '/team', '/license'].map((path) => ({
    url: getPublicUrl(path),
  }))

  const docsPages = getSidebarGroups()
    .flatMap((group) => group.items)
    .map((page) => ({ url: getPublicUrl(`/docs/${page.slug}`) }))

  const blogPages = blogs.map((blog) => ({
    url: getPublicUrl(`/blog/${blog.slug}`),
    lastModified: new Date(blog.date),
  }))

  const examples = await fetchExamples()
  const examplePages = examples.map((example) => ({ url: getPublicUrl(`/examples/${example}`) }))

  return [...staticPages, ...docsPages, ...blogPages, ...examplePages]
}
