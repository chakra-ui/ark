import { Portal } from '@ark-ui/react'
import { FiArrowRight, FiX } from 'react-icons/fi'
import { Stack } from 'styled-system/jsx'
import type { DrawerVariantProps } from 'styled-system/recipes'
import { Button } from '~/components/ui/button'
import {
  Drawer,
  DrawerBackdrop,
  DrawerCloseTrigger,
  DrawerContainer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer'
import { IconButton } from '~/components/ui/icon-button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

export const DrawerDemo = (props: DrawerVariantProps) => {
  return (
    <Drawer {...props}>
      <DrawerTrigger asChild>
        <Button variant="secondary">Open Drawer</Button>
      </DrawerTrigger>
      <Portal>
        <DrawerBackdrop />
        <DrawerContainer>
          <DrawerContent>
            <Stack gap="6">
              <Stack gap="1">
                <DrawerTitle mb="1">Drawer Heading</DrawerTitle>
                <DrawerDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                </DrawerDescription>
              </Stack>
              <Stack gap="4">
                <Stack gap="1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </Stack>
                <Stack gap="1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Your e-mail" />
                </Stack>
              </Stack>
              <DrawerCloseTrigger asChild>
                <Button>
                  Continue <FiArrowRight />
                </Button>
              </DrawerCloseTrigger>
            </Stack>

            <DrawerCloseTrigger position="absolute" top="3" right="4" asChild>
              <IconButton aria-label="Close Drawer" variant="tertiary">
                <FiX />
              </IconButton>
            </DrawerCloseTrigger>
          </DrawerContent>
        </DrawerContainer>
      </Portal>
    </Drawer>
  )
}
