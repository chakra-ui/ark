import { type Pages, pages } from '.velite'
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
  items: Pages[]
}

const findPageById = (id: string): Pages | undefined => {
  return pages.find((p) => p.id === id && p.framework === '*') ?? pages.find((p) => p.id === id)
}

export const getSidebarGroups = (): SidebarGroup[] => {
  return sidebarConfig
    .map((group) => {
      const items: SidebarItem[] = []
      for (const item of group.items) {
        const page = findPageById(item.id)
        if (page) {
          items.push({
            id: page.id,
            title: item.title ?? page.title,
            slug: page.slug,
            status: page.status,
          })
        }
      }
      return { title: group.title, items }
    })
    .filter((group) => group.items.length > 0)
}

// Returns full page objects for LLMs routes that need content
export const getSidebarGroupsWithPages = (): SidebarGroupWithPages[] => {
  return sidebarConfig
    .map((group) => {
      const items: Pages[] = []
      for (const item of group.items) {
        const page = findPageById(item.id)
        if (page) {
          items.push(page)
        }
      }
      return { title: group.title, items }
    })
    .filter((group) => group.items.length > 0)
}

// Alias for backward compatibility
export const getSidebarItems = getSidebarGroups
