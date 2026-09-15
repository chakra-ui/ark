'use client'
import { BlocksIcon, BookOpenIcon, WrenchIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { css } from 'styled-system/css'
import { Box, HStack } from 'styled-system/jsx'
import { getActiveTab } from '~/lib/active-tab'
import type { SidebarTab } from '~/lib/sidebar'
import { VersionSelect } from '../version-select'

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
    <Box borderBottomWidth="1px" borderColor="border.default" bg="bg.canvas">
      <HStack
        as="nav"
        aria-label="Documentation sections"
        maxW="1440px"
        mx="auto"
        gap="1"
        px={{ base: '4', md: '8' }}
        height="var(--tabbar-height)"
        overflowX="auto"
        className="scroller"
      >
        {tabs.map((tab) => {
          const Icon = icons[tab.key]
          const isActive = active?.key === tab.key
          return (
            <NextLink
              key={tab.key}
              href={`/docs/${tab.landingSlug ?? ''}`}
              aria-current={isActive ? 'page' : undefined}
              className={css({
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '2',
                px: '3',
                height: 'full',
                whiteSpace: 'nowrap',
                textStyle: 'sm',
                fontWeight: 'semibold',
                color: isActive ? 'fg.default' : 'fg.muted',
                transitionProperty: 'color',
                transitionDuration: 'normal',
                _hover: { color: 'fg.default' },
                _after: {
                  content: '""',
                  position: 'absolute',
                  left: '3',
                  right: '3',
                  bottom: '0',
                  height: '2px',
                  bg: isActive ? 'colorPalette.default' : 'transparent',
                  transitionProperty: 'background',
                  transitionDuration: 'normal',
                },
                '& svg': { width: '4', height: '4' },
              })}
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
      </HStack>
    </Box>
  )
}
