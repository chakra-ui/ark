'use client'
import type { Assign } from '@ark-ui/react'
import { Select } from '@ark-ui/react/select'
import { type SelectVariantProps, select } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(select)

export interface RootProps
  extends Assign<JsxStyleProps, Select.RootProps<Select.CollectionItem>>,
    SelectVariantProps {}
export const Root = withProvider<HTMLDivElement, RootProps>(Select.Root, 'root')

export const ClearTrigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, Select.ClearTriggerProps>
>(Select.ClearTrigger, 'clearTrigger')

export const Content = withContext<HTMLDivElement, Assign<JsxStyleProps, Select.ContentProps>>(
  Select.Content,
  'content',
)

export const Control = withContext<HTMLDivElement, Assign<JsxStyleProps, Select.ControlProps>>(
  Select.Control,
  'control',
)

export const Indicator = withContext<HTMLDivElement, Assign<JsxStyleProps, Select.IndicatorProps>>(
  Select.Indicator,
  'indicator',
)

export const ItemGroupLabel = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, Select.ItemGroupLabelProps>
>(Select.ItemGroupLabel, 'itemGroupLabel')

export const ItemGroup = withContext<HTMLDivElement, Assign<JsxStyleProps, Select.ItemGroupProps>>(
  Select.ItemGroup,
  'itemGroup',
)

export const ItemIndicator = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, Select.ItemIndicatorProps>
>(Select.ItemIndicator, 'itemIndicator')

export const Item = withContext<HTMLDivElement, Assign<JsxStyleProps, Select.ItemProps>>(
  Select.Item,
  'item',
)

export const ItemText = withContext<HTMLDivElement, Assign<JsxStyleProps, Select.ItemTextProps>>(
  Select.ItemText,
  'itemText',
)

export const Label = withContext<HTMLLabelElement, Assign<JsxStyleProps, Select.LabelProps>>(
  Select.Label,
  'label',
)

export const Positioner = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, Select.PositionerProps>
>(Select.Positioner, 'positioner')

export const Trigger = withContext<HTMLButtonElement, Assign<JsxStyleProps, Select.TriggerProps>>(
  Select.Trigger,
  'trigger',
)

export const ValueText = withContext<HTMLSpanElement, Assign<JsxStyleProps, Select.ValueTextProps>>(
  Select.ValueText,
  'valueText',
)

export {
  SelectContext as Context,
  SelectHiddenSelect as HiddenSelect,
  type SelectContextProps as ContextProps,
  type SelectHiddenSelectProps as HiddenSelectProps,
} from '@ark-ui/react/select'
