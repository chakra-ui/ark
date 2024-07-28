'use client'
import type { Assign } from '@ark-ui/react'
import { RadioGroup } from '@ark-ui/react/radio-group'
import { type RadioGroupVariantProps, radioGroup } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(radioGroup)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, RadioGroup.RootProviderBaseProps>, RadioGroupVariantProps>
>(RadioGroup.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, RadioGroup.RootBaseProps>, RadioGroupVariantProps>
>(RadioGroup.Root, 'root')

export const Indicator = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, RadioGroup.IndicatorBaseProps>
>(RadioGroup.Indicator, 'indicator')

export const ItemControl = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, RadioGroup.ItemControlBaseProps>
>(RadioGroup.ItemControl, 'itemControl')

export const Item = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, RadioGroup.ItemBaseProps>
>(RadioGroup.Item, 'item')

export const ItemText = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, RadioGroup.ItemTextBaseProps>
>(RadioGroup.ItemText, 'itemText')

export const Label = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, RadioGroup.LabelBaseProps>
>(RadioGroup.Label, 'label')

export {
  RadioGroupContext as Context,
  RadioGroupItemHiddenInput as ItemHiddenInput,
} from '@ark-ui/react/radio-group'
