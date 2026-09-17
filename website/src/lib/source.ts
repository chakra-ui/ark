import { loader } from 'fumadocs-core/source'
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server'
import type { ComponentType } from 'react'
import { blog, pages } from '../../.source/server'

export const docsSource = loader({ baseUrl: '/docs', source: toFumadocsSource(pages, []) })
export const blogSource = loader({ baseUrl: '/blog', source: toFumadocsSource(blog, []) })

export type DocsPage = (typeof docsSource)['$inferPage']
export type BlogPageData = (typeof blogSource)['$inferPage']

type MDXBody = ComponentType<{ components?: Record<string, ComponentType<any>> }>

export interface PageMeta {
  id: string
  title: string
  subtitle?: string
  description?: string
  status?: string
  framework: string
  slug: string
  category: string
  url: string
}

export interface TocEntry {
  title: string
  url: string
  items: TocEntry[]
}

export interface PageWithToc extends PageMeta {
  toc: TocEntry[]
}

export interface BlogMeta {
  slug: string
  title: string
  description?: string
  author?: string | string[]
  date: string
  tags?: string[]
  image?: string
  featured?: boolean
  type?: 'article' | 'release'
  body: MDXBody
}

const toMeta = (page: DocsPage): PageMeta => ({
  id: page.data.id,
  title: page.data.title,
  subtitle: page.data.subtitle,
  description: page.data.description,
  status: page.data.status,
  framework: '*',
  slug: page.slugs.join('/'),
  category: page.slugs[0] ?? '',
  url: page.url,
})

const tocText = (node: unknown): string => {
  if (node == null || node === false) return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(tocText).join('')
  if (typeof node === 'object' && 'props' in node) {
    return tocText((node as { props?: { children?: unknown } }).props?.children)
  }
  return ''
}

const tocEntries = (toc: DocsPage['data']['toc']): TocEntry[] =>
  toc.map((item) => ({ title: tocText(item.title), url: item.url, items: [] }))

export const pageMetas = (): PageMeta[] => docsSource.getPages().map(toMeta)

export const pagesWithToc = (): PageWithToc[] =>
  docsSource.getPages().map((page) => ({ ...toMeta(page), toc: tocEntries(page.data.toc) }))

export const findDocsPageBySlug = (slug: string): DocsPage | undefined =>
  docsSource.getPages().find((page) => page.slugs.join('/') === slug)

export const findDocsPageById = (id: string): DocsPage | undefined =>
  docsSource.getPages().find((page) => page.data.id === id)

export const getRawBySlug = async (slug: string): Promise<string> => {
  const page = findDocsPageBySlug(slug)
  return page ? await page.data.getText('raw') : ''
}

export const docsPageToc = (page: DocsPage): TocEntry[] => tocEntries(page.data.toc)

export const blogs: BlogMeta[] = blogSource.getPages().map((page) => ({
  slug: page.slugs.join('/'),
  title: page.data.title,
  description: page.data.description,
  author: page.data.author,
  date: page.data.date instanceof Date ? page.data.date.toISOString() : String(page.data.date),
  tags: page.data.tags,
  image: page.data.image,
  featured: page.data.featured,
  type: page.data.type,
  body: page.data.body as MDXBody,
}))
