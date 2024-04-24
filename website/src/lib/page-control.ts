import path from 'node:path'
import { getCollection } from 'astro:content'

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
  const providerPages = await getCollection('providers')
  const changelogPages = await getCollection('changelog')

  return [...overviewPages, ...stylingPages, ...componentPages, ...providerPages, ...changelogPages]
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

interface Item {
  id: string
  name: string
  label?: string
  href?: string
  items?: Item[]
}

export const getSitemap = async (): Promise<Item[]> => {
  const overviewPages = await getOverviewPages()
  const stylingPages = await getCollection('styling')
  const componentPages = await getCollection('components')
  const providerPages = await getCollection('providers')
  const changelogPages = await getCollection('changelog')

  return [
    {
      id: 'overview',
      name: 'Overview',
      items: overviewPages.map((item) => ({
        id: item.data.id,
        name: item.data.title,
        href: path.posix.join('/docs', item.collection, item.data.id),
      })),
    },
    {
      id: 'styling',
      name: 'Styling',
      items: stylingPages.map((item) => ({
        id: item.data.id,
        name: item.data.title,
        href: path.posix.join('/docs', item.collection, item.data.id),
      })),
    },
    {
      id: 'components',
      name: 'Components',
      items: componentPages.map((item) => ({
        id: item.data.id,
        name: item.data.title,
        href: path.posix.join('/docs', item.collection, item.data.id),
        label: item.data.label,
      })),
    },
    {
      id: 'providers',
      name: 'Providers',
      items: providerPages.map((item) => ({
        id: item.data.id,
        name: item.data.title,
        href: path.posix.join('/docs', item.collection, item.data.id),
        label: item.data.label,
      })),
    },
    {
      id: 'changelog',
      name: 'Changelog',
      items: changelogPages.map((item) => ({
        id: item.data.id,
        name: item.data.id,
        href: path.posix.join('/docs', item.collection, item.data.id),
      })),
    },
  ]
}
