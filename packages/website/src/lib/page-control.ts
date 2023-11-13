import { getCollection } from 'astro:content'
import path from 'node:path'

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
    ? { href: path.join('/docs', item.collection, item.data.id), name: item.data.title }
    : null
}

export const getNextPage = async (pathname?: string) => {
  const collections = await getAllCollections()
  const index = await getCurrentPageIndex(pathname)

  const item = collections[index + 1]
  return item
    ? { href: path.join('/docs', item.collection, item.data.id), name: item.data.title }
    : null
}

type Sitemap = {
  title: string
  items: {
    title: string
    href: string
    label?: string
  }[]
}[]

export const getSitemap = async (): Promise<Sitemap> => {
  const overviewPages = await getOverviewPages()
  const stylingPages = await getCollection('styling')
  const componentPages = await getCollection('components')
  const changelogPages = await getCollection('changelog')

  return [
    {
      title: 'Overview',
      items: overviewPages.map((item) => ({
        title: item.data.title,
        href: path.join('/docs', item.collection, item.data.id),
      })),
    },
    {
      title: 'Styling',
      items: stylingPages.map((item) => ({
        title: item.data.title,
        href: path.join('/docs', item.collection, item.data.id),
      })),
    },
    {
      title: 'Components',
      items: componentPages.map((item) => ({
        title: item.data.title,
        href: path.join('/docs', item.collection, item.data.id),
        label: item.data.label,
      })),
    },
    {
      title: 'Changelog',
      items: changelogPages.map((item) => ({
        title: item.data.id,
        href: path.join('/docs', item.collection, item.data.id),
      })),
    },
  ]
}
