'use client'
import type { Assign, PolymorphicProps } from '@ark-ui/react'
import { Dialog } from '@ark-ui/react/dialog'
import { ark } from '@ark-ui/react/factory'
import { type DrawerVariantProps, drawer } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withRootProvider, withContext } = createStyleContext(drawer)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withRootProvider<
  Assign<Dialog.RootProviderBaseProps, DrawerVariantProps>
>(Dialog.RootProvider)

export type RootProps = ComponentProps<typeof Root>
export const Root = withRootProvider<Assign<Dialog.RootProps, DrawerVariantProps>>(Dialog.Root)

export const Backdrop = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Dialog.BackdropBaseProps>
>(Dialog.Backdrop, 'backdrop')

export const CloseTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Dialog.CloseTriggerBaseProps>
>(Dialog.CloseTrigger, 'closeTrigger')

export const Content = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Dialog.ContentBaseProps>
>(Dialog.Content, 'content')

export const Description = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Dialog.DescriptionBaseProps>
>(Dialog.Description, 'description')

export const Positioner = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Dialog.PositionerBaseProps>
>(Dialog.Positioner, 'positioner')

export const Title = withContext<
  HTMLHeadingElement,
  Assign<HTMLStyledProps<'h2'>, Dialog.TitleBaseProps>
>(Dialog.Title, 'title')

export const Trigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Dialog.TriggerBaseProps>
>(Dialog.Trigger, 'trigger')

export const Header = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, PolymorphicProps>>(
  ark.div,
  'header',
)

export const Body = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, PolymorphicProps>>(
  ark.div,
  'body',
)

export const Footer = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, PolymorphicProps>>(
  ark.div,
  'footer',
)

export {
  DialogContext as Context,
  type DialogContextProps as ContextProps,
} from '@ark-ui/react/dialog'
