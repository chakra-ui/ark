import 'server-only'

import { type Pages, pages } from '.velite'
import { getSidebarGroupsWithPages } from './sidebar'

const orderedPages = getSidebarGroupsWithPages().flatMap((group) => group.items)
const pageMap = new Map(pages.map((page) => [page.slug, page]))

export function getPageBySlug(slug: string[], framework?: string): Pages | undefined {
  const slugStr = slug.join('/')
  const page = pageMap.get(slugStr)
  if (!page) return undefined
  if (framework && page.framework !== '*' && page.framework !== framework) {
    return undefined
  }
  return page
}

export interface NavItem {
  slug: string
  title: string
}

export function getPageNavigation(slug: string[]): { prev?: NavItem; next?: NavItem } {
  const slugStr = slug.join('/')
  const index = orderedPages.findIndex((page) => page.slug === slugStr)

  const prevPage = orderedPages[index - 1]
  const nextPage = orderedPages[index + 1]

  return {
    prev: prevPage ? { slug: prevPage.slug, title: prevPage.title } : undefined,
    next: nextPage ? { slug: nextPage.slug, title: nextPage.title } : undefined,
  }
}

export function getAllPageSlugs(): Array<{ slug: string[]; framework: string }> {
  return ['react', 'solid', 'vue'].flatMap((framework) =>
    orderedPages.map((page) => ({ framework, slug: page.slug.split('/') })),
  )
}
