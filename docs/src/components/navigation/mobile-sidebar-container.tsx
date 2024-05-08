'use client'
import { Portal } from '@ark-ui/react'
import { MenuIcon, XIcon } from 'lucide-react'
import NextLink from 'next/link'
import type { PropsWithChildren } from 'react'
import { Logo } from '~/components/logo'
import { Drawer, IconButton } from '~/components/ui'

export const MobileSidebarContainer = (props: PropsWithChildren) => (
  <Drawer.Root variant="left">
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
              <Logo height="7" />
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
