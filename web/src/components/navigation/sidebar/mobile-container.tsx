import { Portal } from '@ark-ui/react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, type PropsWithChildren } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { Stack } from 'styled-system/jsx'
import { Logo } from '~/components/logo'
import {
  Drawer,
  DrawerBackdrop,
  DrawerCloseTrigger,
  DrawerContainer,
  DrawerContent,
  DrawerTrigger,
} from '~/components/ui/drawer'
import { IconButton } from '~/components/ui/icon-button'

export const MobileContainer = (props: PropsWithChildren) => {
  return (
    <Drawer placement="left">
      {({ close }) => (
        <>
          <DrawerTrigger asChild>
            <IconButton aria-label="Open Menu" variant="tertiary" size="sm">
              <FiMenu />
            </IconButton>
          </DrawerTrigger>
          <RouteChangeHandler close={close} />
          <Portal>
            <DrawerBackdrop />
            <DrawerContainer>
              <DrawerContent>
                <Stack gap="8" mt="-0.5" align="start">
                  <NextLink href="/">
                    <Logo />
                  </NextLink>
                  {props.children}
                </Stack>
                <DrawerCloseTrigger position="absolute" top="3" right="4" asChild>
                  <IconButton aria-label="Close Sidebar" variant="tertiary">
                    <FiX />
                  </IconButton>
                </DrawerCloseTrigger>
              </DrawerContent>
            </DrawerContainer>
          </Portal>
        </>
      )}
    </Drawer>
  )
}

type Props = {
  close: () => void
}

const RouteChangeHandler = (props: Props) => {
  const { close } = props
  const pathname = usePathname()
  useEffect(() => {
    close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
  return null
}
