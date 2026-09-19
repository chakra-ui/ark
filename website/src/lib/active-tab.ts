import { extractFramework } from './frameworks'
import type { SidebarTab } from './sidebar'

export const getActiveTab = (pathname: string, tabs: SidebarTab[]): SidebarTab | undefined => {
  const segments = pathname.split('/').filter(Boolean)
  const { slug } = extractFramework(segments.slice(1))
  const category = slug[0]
  return tabs.find((tab) => tab.categories.includes(category)) ?? tabs[0]
}
