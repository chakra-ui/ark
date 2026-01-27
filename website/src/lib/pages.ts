import 'server-only'

import { type Pages, pages } from '.velite'
import { getSidebarGroupsWithPages } from './sidebar'

const orderedPages = getSidebarGroupsWithPages().flatMap((group) => group.items)
const uniqueOrderedPages = orderedPages.filter(
  (page, index, self) => self.findIndex((p) => p.slug === page.slug) === index,
)

export function getPageBySlug(slug: string[], framework?: string): Pages | undefined {
  const slugStr = slug.join('/')
  return pages.find((page) => {
    if (page.slug !== slugStr) return false
    if (!framework) return true
    return page.framework === '*' || page.framework === framework
  })
}

export interface NavItem {
  slug: string
  title: string
}

export function getPageNavigation(slug: string[]): { prev?: NavItem; next?: NavItem } {
  const slugStr = slug.join('/')
  const index = uniqueOrderedPages.findIndex((page) => page.slug === slugStr)

  const prevPage = uniqueOrderedPages[index - 1]
  const nextPage = uniqueOrderedPages[index + 1]

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
