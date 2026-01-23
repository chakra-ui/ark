import 'server-only'

import { type Pages, pages } from '.velite'
import { categories } from './sidebar'

const overviewPriority = ['introduction', 'getting-started', 'changelog', 'about']

function getOrderedPages(): Pages[] {
  const sortedCategories = pages.reduce<Record<string, Pages[]>>((acc, page) => {
    const category = page.category
    if (categories.includes(category)) {
      acc[category] ||= []
      acc[category].push(page)
    }
    return acc
  }, {})

  if (sortedCategories.overview) {
    sortedCategories.overview.sort((a, b) => overviewPriority.indexOf(a.id) - overviewPriority.indexOf(b.id))
  }

  return categories
    .filter((category) => Object.hasOwn(sortedCategories, category))
    .flatMap((category) => sortedCategories[category])
}

const orderedPages = getOrderedPages()

export function getPageBySlug(slug: string[], framework?: string): Pages | undefined {
  const slugStr = slug.join('/')
  if (framework) {
    return orderedPages.find(
      (page) => page.slug === slugStr && (page.framework === '*' || page.framework === framework),
    )
  }
  return orderedPages.find((page) => page.slug === slugStr)
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
