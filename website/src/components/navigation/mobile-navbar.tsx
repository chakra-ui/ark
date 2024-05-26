'use client'
import { AlignRightIcon } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { IconButton, Popover } from '~/components/ui'

export const MobileNavbar = (props: PropsWithChildren) => {
  return (
    <Popover.Root positioning={{ placement: 'bottom', offset: { mainAxis: 24 } }}>
      <Popover.Trigger asChild>
        <IconButton aria-label="Open Menu" variant="link">
          <AlignRightIcon />
        </IconButton>
      </Popover.Trigger>
      <Popover.Positioner bg="bg.canvas">
        <Popover.Content
          boxShadow="none"
          maxW="unset"
          px={{ base: '2', md: '6' }}
          width="var(--available-width)"
          height="var(--available-height)"
        >
          <Popover.Title>Title</Popover.Title>
          <Popover.Description>Description</Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}
