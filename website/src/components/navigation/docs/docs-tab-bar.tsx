'use client'
import { BlocksIcon, BookOpenIcon, WrenchIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { css } from 'styled-system/css'
import { HStack } from 'styled-system/jsx'
import { getActiveTab } from '~/lib/active-tab'
import type { SidebarTab } from '~/lib/sidebar'

const icons: Record<string, LucideIcon> = {
  guides: BookOpenIcon,
  components: BlocksIcon,
  utilities: WrenchIcon,
}

interface Props {
  tabs: SidebarTab[]
}

export const DocsTabBar = (props: Props) => {
  const { tabs } = props
  const pathname = usePathname()
  const active = getActiveTab(pathname, tabs)

  return (
    <HStack
      as="nav"
      aria-label="Documentation sections"
      gap="1"
      px={{ base: '4', md: '8' }}
      height="12"
      overflowX="auto"
      borderBottomWidth="1px"
      borderColor={{ _light: 'border.subtle', _dark: 'black' }}
      bg="bg.canvas"
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
              display: 'flex',
              alignItems: 'center',
              gap: '2',
              px: '2',
              height: 'full',
              whiteSpace: 'nowrap',
              textStyle: 'sm',
              fontWeight: 'medium',
              color: isActive ? 'fg.default' : 'fg.muted',
              borderBottomWidth: '2px',
              borderColor: isActive ? 'colorPalette.default' : 'transparent',
              transitionProperty: 'color, border-color',
              transitionDuration: 'normal',
              _hover: { color: 'fg.default' },
              '& svg': { width: '4', height: '4' },
            })}
          >
            {Icon && <Icon />}
            {tab.title}
          </NextLink>
        )
      })}
    </HStack>
  )
}
