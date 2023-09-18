import { Portal } from '@ark-ui/react'
import { Menu, X } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { Stack } from 'styled-system/jsx'
import { Button } from '../ui/button'
import {
  Drawer,
  DrawerBackdrop,
  DrawerCloseTrigger,
  DrawerContainer,
  DrawerContent,
  DrawerTrigger,
} from '../ui/drawer'
import { IconButton } from '../ui/icon-button'

export const MobileSidebarContainer = (props: PropsWithChildren) => (
  <Drawer placement="left">
    {() => (
      <>
        <DrawerTrigger asChild>
          <Button px="0" aria-label="Open Menu" variant="tertiary" size="sm">
            <Menu />
          </Button>
        </DrawerTrigger>
        <Portal>
          <DrawerBackdrop />
          <DrawerContainer>
            <DrawerContent>
              <Stack gap="8" mt="-0.5" align="start">
                <a href="/">Home</a>
                {props.children}
              </Stack>
              <DrawerCloseTrigger position="absolute" top="3" right="4" asChild>
                <IconButton aria-label="Close Sidebar" variant="tertiary">
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
