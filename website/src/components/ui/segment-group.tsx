'use client'
import type { Assign } from '@ark-ui/react'
import { SegmentGroup } from '@ark-ui/react/segment-group'
import { type SegmentGroupVariantProps, segmentGroup } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(segmentGroup)

export interface RootProps
  extends Assign<JsxStyleProps, SegmentGroup.RootProps>,
    SegmentGroupVariantProps {}
export const Root = withProvider<HTMLDivElement, RootProps>(SegmentGroup.Root, 'root')

export const Indicator = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, SegmentGroup.IndicatorProps>
>(SegmentGroup.Indicator, 'indicator')

export const ItemControl = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, SegmentGroup.ItemControlProps>
>(SegmentGroup.ItemControl, 'itemControl')

export const Item = withContext<HTMLLabelElement, Assign<JsxStyleProps, SegmentGroup.ItemProps>>(
  SegmentGroup.Item,
  'item',
)

export const ItemText = withContext<
  HTMLSpanElement,
  Assign<JsxStyleProps, SegmentGroup.ItemTextProps>
>(SegmentGroup.ItemText, 'itemText')

export const Label = withContext<HTMLLabelElement, Assign<JsxStyleProps, SegmentGroup.LabelProps>>(
  SegmentGroup.Label,
  'label',
)

export {
  SegmentGroupContext as Context,
  type SegmentGroupContextProps as ContextProps,
} from '@ark-ui/react/segment-group'
