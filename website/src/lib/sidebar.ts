import { CHANGELOG_META } from './changelog'
import { type PageMeta, findDocsPageById } from './source'
import { type SidebarGroupConfig, sidebarConfig } from './sidebar-config'

export interface SidebarItem {
  id: string
  title: string
  slug: string
  status?: string
}

export interface SidebarGroup {
  title: string
  link?: SidebarItem
  items: SidebarItem[]
}

export interface SidebarTab {
  key: string
  title: string
  categories: string[]
  landingSlug?: string
  groups: SidebarGroup[]
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

const resolveItem = (id: string, title?: string): SidebarItem | undefined => {
  const meta = resolveMeta(id)
  return meta ? { id: meta.id, title: title ?? meta.title, slug: meta.slug, status: meta.status } : undefined
}

const resolveGroups = (groups: SidebarGroupConfig[]): SidebarGroup[] =>
  groups
    .map((group) => ({
      title: group.title,
      link: group.id ? resolveItem(group.id) : undefined,
      items: group.items.flatMap((item) => resolveItem(item.id, item.title) ?? []),
    }))
    .filter((group) => group.items.length > 0)

export const groupPages = (group: SidebarGroup): SidebarItem[] =>
  group.link ? [group.link, ...group.items] : group.items

export const getSidebarTabs = (): SidebarTab[] =>
  sidebarConfig
    .map((tab) => {
      const groups = resolveGroups(tab.groups)
      const slugs = groups.flatMap((group) => groupPages(group).map((item) => item.slug))
      const categories = [...new Set(slugs.map((slug) => slug.split('/')[0]))]
      const landingSlug = groups.find((group) => group.link)?.link?.slug ?? slugs[0]
      return { key: tab.key, title: tab.title, categories, landingSlug, groups }
    })
    .filter((tab) => tab.groups.length > 0)

export const getSidebarGroups = (): SidebarGroup[] => getSidebarTabs().flatMap((tab) => tab.groups)

export const getSidebarGroupsWithPages = (): SidebarGroupWithPages[] =>
  sidebarConfig
    .flatMap((tab) => tab.groups)
    .map((group) => ({
      title: group.title,
      items: [...(group.id ? [group.id] : []), ...group.items.map((item) => item.id)].flatMap(
        (id) => resolveMeta(id) ?? [],
      ),
    }))
    .filter((group) => group.items.length > 0)

export const getSidebarItems = getSidebarGroups
