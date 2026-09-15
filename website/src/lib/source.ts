import { loader } from 'fumadocs-core/source'
import { defineCollections } from 'fumadocs-mdx/macro'
import { z } from 'zod'

const pagesCollection = defineCollections({
  type: 'doc',
  dir: 'src/content/pages',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    status: z.string().optional(),
    metadata: z.record(z.string(), z.any()).optional(),
  }),
})

const blogCollection = defineCollections({
  type: 'doc',
  dir: 'src/content/blog',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    author: z.union([z.string(), z.array(z.string())]).optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
})

export const docsSource = loader({ baseUrl: '/docs', source: pagesCollection.toFumadocsSource() })
export const blogSource = loader({ baseUrl: '/blog', source: blogCollection.toFumadocsSource() })

export type DocsPage = (typeof docsSource)['$inferPage']
export type BlogPage = (typeof blogSource)['$inferPage']

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

export const pageMetas = (): PageMeta[] => docsSource.getPages().map(toMeta)

export const findDocsPageBySlug = (slug: string): DocsPage | undefined =>
  docsSource.getPages().find((page) => page.slugs.join('/') === slug)

export const findDocsPageById = (id: string): DocsPage | undefined =>
  docsSource.getPages().find((page) => page.data.id === id)
