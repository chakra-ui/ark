import { getCollection } from 'astro:content'
import path from 'path'

const getOverviewPages = async () => {
  const priority = ['introduction', 'getting-started', 'as-child-prop', 'animation']
  return getCollection('overview').then((items) =>
    items.sort((a, b) => priority.indexOf(a.slug) - priority.indexOf(b.slug)),
  )
}

export const getAllCollections = async () => {
  const overviewPages = await getOverviewPages()
  const stylingPages = await getCollection('styling')
  const componentPages = await getCollection('components')
  const changelogPages = await getCollection('changelog')

  return [...overviewPages, ...stylingPages, ...componentPages, ...changelogPages]
}

const getCurrentPageIndex = async (pathname?: string) => {
  const slug = pathname?.split('/').pop() ?? ''
  const collections = await getAllCollections()
  return collections.findIndex((item) => item.slug.endsWith(slug))
}

export const getPreviousPage = async (pathname?: string) => {
  const collections = await getAllCollections()
  const index = await getCurrentPageIndex(pathname)

  const item = collections[index - 1]
  return item
    ? { href: path.posix.join('/docs', item.collection, item.data.id), name: item.data.title }
    : null
}

export const getNextPage = async (pathname?: string) => {
  const collections = await getAllCollections()
  const index = await getCurrentPageIndex(pathname)

  const item = collections[index + 1]
  return item
    ? { href: path.posix.join('/docs', item.collection, item.data.id), name: item.data.title }
    : null
}

interface Child {
  id: string
  href?: string
  title: string
  label?: string
  children?: Child[]
}

interface Sitemap {
  label: string
  children: Child[]
}

export const getSitemap = async (): Promise<Sitemap> => {
  const overviewPages = await getOverviewPages()
  const stylingPages = await getCollection('styling')
  const componentPages = await getCollection('components')
  const changelogPages = await getCollection('changelog')

  return {
    label: 'Site navigation',
    children: [
      {
        id: 'overview',
        title: 'Overview',
        children: overviewPages.map((item) => ({
          id: item.data.id,
          title: item.data.title,
          href: path.posix.join('/docs', item.collection, item.data.id),
        })),
      },
      {
        id: 'styling',
        title: 'Styling',
        href: '/docs/styling',
        children: stylingPages.map((item) => ({
          id: item.data.id,
          title: item.data.title,
          href: path.posix.join('/docs', item.collection, item.data.id),
        })),
      },
      {
        id: 'components',
        title: 'Components',
        href: '/docs/components',
        children: [
          ...componentPages
            .filter((item) => !item.id.startsWith('progress'))
            .map((item) => ({
              id: item.data.id,
              title: item.data.title,
              href: path.posix.join('/docs', item.collection, item.data.id),
              label: item.data.label,
            })),
          {
            id: 'progress',
            title: 'Progress',
            href: '/docs/components/progress',
            children: componentPages
              .filter((item) => item.id.startsWith('progress'))
              .map((item) => ({
                id: item.data.id,
                title: item.data.title,
                href: path.posix.join('/docs', item.collection, item.data.id),
                label: item.data.label,
              })),
          },
        ].sort((a, b) => a.title.localeCompare(b.title)),
      },
      {
        id: 'changelog',
        title: 'Changelog',
        href: '/docs/changelog',
        children: changelogPages.map((item) => ({
          id: item.data.id,
          title: item.data.id,
          href: path.posix.join('/docs', item.collection, item.data.id),
        })),
      },
    ],
  }
}
