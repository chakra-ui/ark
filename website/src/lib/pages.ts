import 'server-only'

import { CHANGELOG_META, isChangelogSlug } from './changelog'
import type { PageMeta } from './source'
import { getSidebarGroupsWithPages, getSidebarTabs } from './sidebar'

const orderedPages = getSidebarGroupsWithPages().flatMap((group) => group.items)
const uniqueOrderedPages = orderedPages.filter(
  (page, index, self) => self.findIndex((p) => p.slug === page.slug) === index,
)

const tabOrders = getSidebarTabs().map((tab) => ({
  categories: tab.categories,
  items: tab.groups.flatMap((group) => group.items),
}))

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
  const category = slug[0]
  const tab = tabOrders.find((t) => t.categories.includes(category)) ?? tabOrders[0]
  const items = tab?.items ?? []
  const index = items.findIndex((item) => item.slug === slugStr)
  if (index === -1) return {}

  const prevItem = items[index - 1]
  const nextItem = items[index + 1]
  return {
    prev: prevItem ? { slug: prevItem.slug, title: prevItem.title } : undefined,
    next: nextItem ? { slug: nextItem.slug, title: nextItem.title } : undefined,
  }
}

export function getAllPageSlugs(): Array<{ slug: string[] }> {
  return uniqueOrderedPages.map((page) => ({ slug: page.slug.split('/') }))
}
