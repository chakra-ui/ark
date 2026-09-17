'use client'
import { ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import { Box, HStack } from 'styled-system/jsx'
import { Text } from '~/components/ui/text'
import { getActiveTab } from '~/lib/active-tab'
import type { SidebarTab } from '~/lib/sidebar'

interface Props {
  tabs?: SidebarTab[]
}

export const Breadcrumbs = (props: Props) => {
  const pathname = usePathname()
  const crumbs = pathname
    .split('/')
    .filter(Boolean)
    .filter((path) => !['docs', 'react', 'vue', 'solid', 'svelte', 'usage', 'types'].includes(path))
    .map((path) => path.replace(/-/g, ' '))
    .map((item) => item.charAt(0).toUpperCase() + item.substring(1))

  const tabTitle = props.tabs ? getActiveTab(pathname, props.tabs)?.title : undefined
  if (tabTitle && crumbs[0]?.toLowerCase() !== tabTitle.toLowerCase()) {
    crumbs.unshift(tabTitle)
  }

  return (
    <HStack gap="1">
      {crumbs?.map((crumb, index, arr) => (
        <Fragment key={index}>
          <Text as="span" textStyle="sm" color="fg.muted" fontWeight="medium" textTransform="capitalize">
            {crumb}
          </Text>
          {arr.length - 1 !== index && (
            <Box color="fg.subtle">
              <ChevronRight size="16" />
            </Box>
          )}
        </Fragment>
      ))}
    </HStack>
  )
}
