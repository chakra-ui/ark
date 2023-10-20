import { Portal } from '@ark-ui/react'
import { Menu, X } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { Stack } from 'styled-system/jsx'
import { Logo } from '~/components/logo'
import { Button } from '~/components/ui/button'
import {
  Drawer,
  DrawerBackdrop,
  DrawerCloseTrigger,
  DrawerContainer,
  DrawerContent,
  DrawerTrigger,
} from '~/components/ui/drawer'
import { IconButton } from '~/components/ui/icon-button'

export const MobileSidebarContainer = (props: PropsWithChildren) => (
  <Drawer placement="left">
    {() => (
      <>
        <DrawerTrigger asChild>
          <Button px="0" aria-label="Open Menu" variant="ghost" size="sm">
            <Menu />
          </Button>
        </DrawerTrigger>
        <Portal>
          <DrawerBackdrop />
          <DrawerContainer width="full">
            <DrawerContent>
              <Stack gap="8" mt="-0.5" align="start">
                <a href="/" aria-label="Back home">
                  <Logo height="22" />
                </a>
                {props.children}
              </Stack>
              <DrawerCloseTrigger position="absolute" top="3" right="4" asChild>
                <IconButton aria-label="Close Sidebar" variant="ghost">
                  <X />
                </IconButton>
              </DrawerCloseTrigger>
            </DrawerContent>
          </DrawerContainer>
        </Portal>
      </>
    )}
  </Drawer>
)
