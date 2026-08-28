import { fetchExamplesGroupedByCategory } from './examples'
import type { SearchItem } from './search-query'
import { pages } from '.velite'

export type { SearchData, SearchItem } from './search-query'

type TocEntry = {
  title: string
  url: string
  items: TocEntry[]
}

const categoryToGroup: Record<string, string> = {
  overview: 'Overview',
  guides: 'Guides',
  components: 'Components',
  utilities: 'Utilities',
  collections: 'Collections',
  ai: 'AI',
}

const uniquePages = [...new Map(pages.map((page) => [page.slug, page])).values()].filter(
  (page) => page.category !== 'license.mdx',
)

const flattenToc = (entries: TocEntry[], pageTitle: string, pageSlug: string, parents: string[] = []): SearchItem[] =>
  entries.flatMap((entry) => {
    const item: SearchItem = {
      label: entry.title,
      value: `/docs/${pageSlug}${entry.url}`,
      group: 'Sections',
      parents: [pageTitle, ...parents],
      description: pageTitle,
    }
    const nested = entry.items?.length ? flattenToc(entry.items, pageTitle, pageSlug, [...parents, entry.title]) : []
    return [item, ...nested]
  })

const docsPages: SearchItem[] = uniquePages
  .filter((page) => categoryToGroup[page.category])
  .map((page) => ({
    label: page.title,
    value: `/docs/${page.slug}`,
    group: categoryToGroup[page.category],
    description: page.description,
  }))

const sections: SearchItem[] = uniquePages
  .filter((page) => categoryToGroup[page.category] && page.toc?.length)
  .flatMap((page) => flattenToc(page.toc as TocEntry[], page.title, page.slug))

const examples: SearchItem[] = await fetchExamplesGroupedByCategory().then((groups) =>
  groups.flatMap((group) =>
    group.items.map((item) => ({
      label: item.title,
      value: `/examples/${item.id}`,
      group: 'Examples',
      description: item.description,
    })),
  ),
)

export const searchItems: SearchItem[] = [...docsPages, ...sections, ...examples]

const popularComponentSlugs = [
  'components/accordion',
  'components/dialog',
  'components/combobox',
  'components/select',
  'components/menu',
  'components/date-picker',
  'components/toast',
  'components/tabs',
]

const bySlug = (slug: string) => docsPages.find((item) => item.value === `/docs/${slug}`)

export const defaultGroups: Record<string, SearchItem[]> = {
  Overview: ['overview/getting-started', 'overview/about', 'overview/changelog']
    .map(bySlug)
    .filter((item): item is SearchItem => !!item),
  Guides: ['guides/styling', 'guides/composition', 'guides/animation', 'guides/forms']
    .map(bySlug)
    .filter((item): item is SearchItem => !!item),
  Components: popularComponentSlugs.map(bySlug).filter((item): item is SearchItem => !!item),
}

export const data = {
  defaults: defaultGroups,
  items: searchItems,
}
