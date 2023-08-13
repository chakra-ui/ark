'use client'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Segment,
  SegmentControl,
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentLabel,
} from '~/components/ui/segment-group'

type ComponentTabsProps = {
  basePath: string
}

export const ComponentSegmentGroup = (props: ComponentTabsProps) => {
  const pathname = usePathname()
  const [value, setValue] = useState('usage')

  useEffect(() => {
    const lastSegment = pathname?.split('/').pop() ?? 'usage'
    const value = ['usage', 'props'].includes(lastSegment) ? lastSegment : 'usage'
    setValue(value)
  }, [pathname])

  return (
    <SegmentGroup value={value} orientation="horizontal">
      <Segment value="usage" asChild>
        <NextLink href={props.basePath + '/usage'}>
          <SegmentControl />
          <SegmentLabel>Usage</SegmentLabel>
        </NextLink>
      </Segment>
      <Segment value="props" asChild>
        <NextLink href={props.basePath + '/props'}>
          <SegmentControl />
          <SegmentLabel>Props</SegmentLabel>
        </NextLink>
      </Segment>
      <SegmentGroupIndicator />
    </SegmentGroup>
  )
}
