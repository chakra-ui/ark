import 'server-only'

import { CHANGELOG_META, isChangelogSlug } from './changelog'
import type { PageMeta } from './source'
import { getSidebarGroupsWithPages } from './sidebar'

const orderedPages = getSidebarGroupsWithPages().flatMap((group) => group.items)
const uniqueOrderedPages = orderedPages.filter(
  (page, index, self) => self.findIndex((p) => p.slug === page.slug) === index,
)

export function getPageBySlug(slug: string[]): PageMeta | undefined {
  const slugStr = slug.join('/')
  if (isChangelogSlug(slugStr)) return CHANGELOG_META
  return uniqueOrderedPages.find((page) => page.slug === slugStr)
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

export function getAllPageSlugs(): Array<{ slug: string[] }> {
  return uniqueOrderedPages.map((page) => ({ slug: page.slug.split('/') }))
}
