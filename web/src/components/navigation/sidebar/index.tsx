'use client'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Stack } from 'styled-system/jsx'
import {
  Segment,
  SegmentControl,
  SegmentGroup,
  SegmentIndicator,
  SegmentInput,
  SegmentLabel,
} from '~/components/ui/segment-group'
import { Typography } from '~/components/ui/typography'
import { getComponentDocuments, getGeneralDocuments } from '~/lib/contentlayer'
import { SidebarExternalLinks } from './external-links'
import { FrameworkSelect } from './framework-select'

type Props = {
  framework: string
}

export const Sidebar = (props: Props) => {
  const { framework } = props
  const overview = {
    heading: 'Overview',
    items: getGeneralDocuments(framework).map((doc) => ({
      label: doc.name,
      href: doc.route,
    })),
  }

  const components = {
    heading: 'Components',
    items: getComponentDocuments(framework).map((doc) => ({
      label: doc.name,
      href: doc.route,
    })),
  }

  const pathname = usePathname()
  const [currentPath, setCurrentPath] = useState(pathname)

  useEffect(() => {
    const path = pathname.replace(/\/(props|usage)$/, '')
    setCurrentPath(path)
  }, [pathname])

  const sitemap = [overview, components]

  return (
    <Stack gap="8" width="full">
      <SidebarExternalLinks />
      <FrameworkSelect />
      {sitemap.map((group) => (
        <Stack gap="3" key={group.heading}>
          <Typography textStyle={{ base: 'md', md: 'sm' }} fontWeight="bold">
            {group.heading}
          </Typography>
          <SegmentGroup value={currentPath} orientation="vertical" size={{ base: 'md', md: 'sm' }}>
            {group.items.map((option, id) => (
              <Segment key={id} value={option.href} data-orientation="vertical" asChild>
                <NextLink href={option.href}>
                  <SegmentInput />
                  <SegmentControl />
                  <SegmentLabel>{option.label}</SegmentLabel>
                </NextLink>
              </Segment>
            ))}
            <SegmentIndicator hidden={!group.items.some((entry) => entry.href === currentPath)} />
          </SegmentGroup>
        </Stack>
      ))}
    </Stack>
  )
}
