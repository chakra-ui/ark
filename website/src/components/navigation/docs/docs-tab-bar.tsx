'use client'
import { BlocksIcon, BookOpenIcon, WrenchIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { Box } from 'styled-system/jsx'
import { tabBar } from 'styled-system/recipes'
import { getActiveTab } from '~/lib/active-tab'
import type { SidebarTab } from '~/lib/sidebar'
import { VersionSelect } from '../version-select'

const styles = tabBar()

const icons: Record<string, LucideIcon> = {
  guides: BookOpenIcon,
  components: BlocksIcon,
  utilities: WrenchIcon,
}

interface Props {
  tabs: SidebarTab[]
  latestVersion?: string
}

export const DocsTabBar = (props: Props) => {
  const { tabs, latestVersion } = props
  const pathname = usePathname()
  const active = getActiveTab(pathname, tabs)

  return (
    <div className={styles.root}>
      <nav aria-label="Documentation sections" className={styles.list}>
        {tabs.map((tab) => {
          const Icon = icons[tab.key]
          const isActive = active?.key === tab.key
          return (
            <NextLink
              key={tab.key}
              href={`/docs/${tab.landingSlug ?? ''}`}
              aria-current={isActive ? 'page' : undefined}
              className={styles.link}
            >
              {Icon && <Icon />}
              {tab.title}
            </NextLink>
          )
        })}
        {latestVersion && (
          <Box ms="auto" ps="4" flexShrink="0">
            <VersionSelect latest={latestVersion} />
          </Box>
        )}
      </nav>
    </div>
  )
}
