'use client'
import { Portal } from '@ark-ui/react'
import { AlignLeftIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { type PropsWithChildren, useEffect, useState } from 'react'
import { Drawer, IconButton } from '~/components/ui'

export const MobileSidebarContainer = (props: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname) {
      setIsOpen(false)
    }
  }, [pathname])

  return (
    <Drawer.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)} variant="left">
      <Drawer.Trigger asChild>
        <IconButton aria-label="Open Sidebar" variant="link" size="sm" minH="8">
          <AlignLeftIcon />
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner width="xs">
          <Drawer.Content>
            <Drawer.Body>{props.children}</Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
