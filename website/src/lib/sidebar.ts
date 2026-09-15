import { CHANGELOG_META } from './changelog'
import { type PageMeta, findDocsPageById } from './source'
import { sidebarConfig } from './sidebar-config'

export interface SidebarItem {
  id: string
  title: string
  slug: string
  status?: string
}

export interface SidebarGroup {
  title: string
  items: SidebarItem[]
}

export interface SidebarGroupWithPages {
  title: string
  items: PageMeta[]
}

const resolveMeta = (id: string): PageMeta | undefined => {
  if (id === 'changelog') return CHANGELOG_META
  const page = findDocsPageById(id)
  if (!page) return undefined
  return {
    id: page.data.id,
    title: page.data.title,
    subtitle: page.data.subtitle,
    description: page.data.description,
    status: page.data.status,
    framework: '*',
    slug: page.slugs.join('/'),
    category: page.slugs[0] ?? '',
    url: page.url,
  }
}

export const getSidebarGroups = (): SidebarGroup[] =>
  sidebarConfig
    .map((group) => ({
      title: group.title,
      items: group.items.flatMap((item) => {
        const meta = resolveMeta(item.id)
        return meta ? [{ id: meta.id, title: item.title ?? meta.title, slug: meta.slug, status: meta.status }] : []
      }),
    }))
    .filter((group) => group.items.length > 0)

export const getSidebarGroupsWithPages = (): SidebarGroupWithPages[] =>
  sidebarConfig
    .map((group) => ({
      title: group.title,
      items: group.items.flatMap((item) => {
        const meta = resolveMeta(item.id)
        return meta ? [meta] : []
      }),
    }))
    .filter((group) => group.items.length > 0)

export const getSidebarItems = getSidebarGroups
