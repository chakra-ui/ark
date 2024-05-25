'use client'
import type { Assign } from '@ark-ui/react'
import { RadioGroup } from '@ark-ui/react/radio-group'
import { type RadioGroupVariantProps, radioGroup } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(radioGroup)

export interface RootProps
  extends Assign<JsxStyleProps, RadioGroup.RootProps>,
    RadioGroupVariantProps {}
export const Root = withProvider<HTMLDivElement, RootProps>(RadioGroup.Root, 'root')

export const Indicator = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, RadioGroup.IndicatorProps>
>(RadioGroup.Indicator, 'indicator')

export const ItemControl = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, RadioGroup.ItemControlProps>
>(RadioGroup.ItemControl, 'itemControl')

export const Item = withContext<HTMLLabelElement, Assign<JsxStyleProps, RadioGroup.ItemProps>>(
  RadioGroup.Item,
  'item',
)

export const ItemText = withContext<
  HTMLSpanElement,
  Assign<JsxStyleProps, RadioGroup.ItemTextProps>
>(RadioGroup.ItemText, 'itemText')

export const Label = withContext<HTMLLabelElement, Assign<JsxStyleProps, RadioGroup.LabelProps>>(
  RadioGroup.Label,
  'label',
)
export {
  RadioGroupContext as Context,
  type RadioGroupContextProps as ContextProps,
} from '@ark-ui/react/radio-group'
