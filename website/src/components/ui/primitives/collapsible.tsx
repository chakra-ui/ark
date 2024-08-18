'use client'
import type { Assign } from '@ark-ui/react'
import { Collapsible } from '@ark-ui/react/collapsible'
import { type CollapsibleVariantProps, collapsible } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(collapsible)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, Collapsible.RootProviderBaseProps>, CollapsibleVariantProps>
>(Collapsible.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, Collapsible.RootBaseProps>, CollapsibleVariantProps>
>(Collapsible.Root, 'root')

export const Content = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Collapsible.ContentBaseProps>
>(Collapsible.Content, 'content')

export const Trigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Collapsible.TriggerBaseProps>
>(Collapsible.Trigger, 'trigger')

export { CollapsibleContext as Context } from '@ark-ui/react/collapsible'
