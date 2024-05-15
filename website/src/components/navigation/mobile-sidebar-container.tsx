'use client'
import { Portal } from '@ark-ui/react'
import { MenuIcon, XIcon } from 'lucide-react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { type PropsWithChildren, useEffect, useState } from 'react'
import { Logo } from '~/components/logo'
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
        <IconButton aria-label="Open Menu" variant="link" size="sm" minH="8">
          <MenuIcon />
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header height="16" justifyContent="center">
              <NextLink href="/" aria-label="Go to start page">
                <Logo />
              </NextLink>
              <Drawer.CloseTrigger position="absolute" asChild>
                <IconButton aria-label="Close Sidebar" variant="ghost" top="3" right="4">
                  <XIcon />
                </IconButton>
              </Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body>{props.children}</Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
