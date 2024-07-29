'use client'
import { Portal } from '@ark-ui/react/portal'
import { AlignRightIcon, XIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { type PropsWithChildren, useEffect, useState } from 'react'
import { IconButton } from '~/components/ui/icon-button'
import { Popover } from '~/components/ui/popover'

export const MobileNavbar = (props: PropsWithChildren) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (pathname) {
      setOpen(false)
    }
  }, [pathname])

  return (
    <Popover.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      positioning={{
        placement: 'bottom',
        overflowPadding: 0,
        offset: { mainAxis: 12 },
      }}
      portalled
    >
      <Popover.Trigger asChild>
        <IconButton aria-label="Open Menu" variant="ghost">
          {open ? <XIcon /> : <AlignRightIcon />}
        </IconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            _open={{ animation: 'backdrop-in' }}
            _closed={{ animation: 'backdrop-out' }}
            boxShadow="none"
            borderRadius="none"
            bg="bg.canvas"
            maxW="unset"
            px={{ base: '4', md: '8' }}
            width="var(--available-width)"
            height="var(--available-height)"
            alignItems="center"
            py="6"
            {...props}
          />
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
