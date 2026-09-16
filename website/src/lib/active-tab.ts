import type { SidebarTab } from './sidebar'

export const getActiveTab = (pathname: string, tabs: SidebarTab[]): SidebarTab | undefined => {
  const category = pathname.split('/')[2]
  return tabs.find((tab) => tab.categories.includes(category)) ?? tabs[0]
}
