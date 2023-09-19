import * as Ark from '@ark-ui/react/dialog'
import { styled } from 'styled-system/jsx'
import { drawer, type DrawerVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(drawer)

export * from '@ark-ui/react/dialog'
export type DrawerProps = Ark.DialogProps & DrawerVariantProps

const DrawerRoot = withProvider(styled(Ark.Dialog.Root))
export const DrawerBackdrop = withContext(styled(Ark.Dialog.Backdrop), 'backdrop')
export const DrawerCloseTrigger = withContext(styled(Ark.Dialog.CloseTrigger), 'closeTrigger')
export const DrawerContainer = withContext(styled(Ark.Dialog.Container), 'container')
export const DrawerContent = withContext(styled(Ark.Dialog.Content), 'content')
export const DrawerDescription = withContext(styled(Ark.Dialog.Description), 'description')
export const DrawerTitle = withContext(styled(Ark.Dialog.Title), 'title')
export const DrawerTrigger = withContext(styled(Ark.Dialog.Trigger), 'trigger')

export const Drawer = Object.assign(DrawerRoot, {
  Root: DrawerRoot,
  Backdrop: DrawerBackdrop,
  CloseTrigger: DrawerCloseTrigger,
  Container: DrawerContainer,
  Content: DrawerContent,
  Description: DrawerDescription,
  Title: DrawerTitle,
  Trigger: DrawerTrigger,
})
