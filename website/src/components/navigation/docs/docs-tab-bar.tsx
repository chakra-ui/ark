'use client'
import { BlocksIcon, BookOpenIcon, HeartIcon, WrenchIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { css } from 'styled-system/css'
import { HStack } from 'styled-system/jsx'
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
        <HStack ms="auto" ps="4" gap="4" flexShrink="0">
          <a
            href="https://opencollective.com/chakra-ui"
            target="_blank"
            rel="noreferrer"
            className={css({
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1.5',
              textStyle: 'sm',
              fontWeight: 'medium',
              color: 'fg.muted',
              whiteSpace: 'nowrap',
              transitionProperty: 'color',
              transitionDuration: 'normal',
              _hover: { color: 'fg.default' },
              '& svg': { width: '4', height: '4', color: 'red.9', fill: 'red.9' },
            })}
          >
            <HeartIcon />
            Sponsor
          </a>
          {latestVersion && <VersionSelect latest={latestVersion} />}
        </HStack>
      </nav>
    </div>
  )
}
