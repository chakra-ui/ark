'use client'
import type { Assign } from '@ark-ui/react'
import { Accordion } from '@ark-ui/react/accordion'
import { type AccordionVariantProps, accordion } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(accordion)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, Accordion.RootProviderBaseProps>, AccordionVariantProps>
>(Accordion.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, Accordion.RootBaseProps>, AccordionVariantProps>
>(Accordion.Root, 'root')

export const ItemContent = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Accordion.ItemContentBaseProps>
>(Accordion.ItemContent, 'itemContent')

export const ItemIndicator = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Accordion.ItemIndicatorBaseProps>
>(Accordion.ItemIndicator, 'itemIndicator')

export const Item = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Accordion.ItemBaseProps>
>(Accordion.Item, 'item')

export const ItemTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Accordion.ItemTriggerBaseProps>
>(Accordion.ItemTrigger, 'itemTrigger')

export {
  AccordionContext as Context,
  AccordionItemContext as ItemContext,
} from '@ark-ui/react/accordion'

export type {
  AccordionFocusChangeDetails as FocusChangeDetails,
  AccordionValueChangeDetails as ValueChangeDetails,
} from '@ark-ui/react/accordion'
