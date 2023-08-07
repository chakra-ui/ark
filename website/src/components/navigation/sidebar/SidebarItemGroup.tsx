'use client'
import { Text } from '@/components/shared/Text'
import {
  Segment,
  SegmentControl,
  SegmentGroup,
  SegmentIndicator,
  SegmentInput,
  SegmentLabel,
} from '@/components/ui/segment-group'
import { Stack } from '@/panda/jsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export type SidebarItemGroupProps = {
  heading: string
  items: {
    href: string
    label: string
  }[]
}

export const SidebarItemGroup = (props: SidebarItemGroupProps) => {
  const { heading, items } = props
  const pathname = usePathname()
  const [currentPath, setCurrentPath] = useState(pathname)

  useEffect(() => {
    setCurrentPath(pathname)
  }, [pathname])

  return (
    <Stack gap="3">
      <Text textStyle={{ base: 'md', md: 'sm' }} fontWeight="bold">
        {heading}
      </Text>
      <SegmentGroup value={currentPath} orientation="vertical" size={{ base: 'md', md: 'sm' }}>
        {items.map((option, id) => (
          <Segment key={id} value={option.href} data-orientation="vertical" asChild>
            <Link href={option.href}>
              <SegmentInput />
              <SegmentControl />
              <SegmentLabel>{option.label}</SegmentLabel>
            </Link>
          </Segment>
        ))}
        <SegmentIndicator hidden={!items.some((entry) => entry.href === currentPath)} />
      </SegmentGroup>
    </Stack>
  )
}
