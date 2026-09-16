import { matchSorter } from 'match-sorter'
import type { Framework } from '~/lib/frameworks'
import { cleanupPageContent } from '~/lib/llm-content'
import type { PageMeta } from './source'
import { getSidebarGroupsWithPages } from './sidebar'

export interface DocsEntry {
  slug: string
  title: string
  description: string
  category: string
  url: string
}

export interface DocsPage extends DocsEntry {
  content: string
}

interface DocsPageSource {
  page: PageMeta
  category: string
}

const getDocsSources = (): DocsPageSource[] =>
  getSidebarGroupsWithPages().flatMap((group) =>
    group.items.map((page) => ({
      page,
      category: group.title,
    })),
  )

const toEntry = ({ page, category }: DocsPageSource): DocsEntry => ({
  slug: page.slug,
  title: page.title,
  description: page.description ?? '',
  category,
  url: `https://ark-ui.com/docs/${page.slug}`,
})

export const formatDocContent = async (page: PageMeta, framework: Framework = 'react') => `# ${page.title}

URL: https://ark-ui.com/docs/${page.slug}
LLM: https://ark-ui.com/llms.txt/${page.slug}

${page.description || ''}

---

${await cleanupPageContent(page, framework)}`

export const listDocs = (): DocsEntry[] => getDocsSources().map(toEntry)

export const getDoc = async (slug: string, framework: Framework = 'react'): Promise<DocsPage | null> => {
  const normalized = slug.replace(/\.mdx$/, '')
  const source = getDocsSources().find(({ page }) => page.slug === normalized)
  if (!source) return null

  return {
    ...toEntry(source),
    content: await formatDocContent(source.page, framework),
  }
}

export const searchDocs = (query: string, limit = 10): DocsEntry[] => {
  const value = query.trim()
  const docs = listDocs()

  if (!value) return docs.slice(0, limit)

  return matchSorter(docs, value, {
    keys: ['title', 'description', 'slug', 'category'],
  }).slice(0, limit)
}
