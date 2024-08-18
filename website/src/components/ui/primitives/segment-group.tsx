'use client'
import type { Assign } from '@ark-ui/react'
import { SegmentGroup } from '@ark-ui/react/segment-group'
import { type SegmentGroupVariantProps, segmentGroup } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(segmentGroup)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<
    Assign<HTMLStyledProps<'div'>, SegmentGroup.RootProviderBaseProps>,
    SegmentGroupVariantProps
  >
>(SegmentGroup.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, SegmentGroup.RootBaseProps>, SegmentGroupVariantProps>
>(SegmentGroup.Root, 'root')

export const Indicator = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, SegmentGroup.IndicatorBaseProps>
>(SegmentGroup.Indicator, 'indicator')

export const ItemControl = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, SegmentGroup.ItemControlBaseProps>
>(SegmentGroup.ItemControl, 'itemControl')

export const Item = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, SegmentGroup.ItemBaseProps>
>(SegmentGroup.Item, 'item')

export const ItemText = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, SegmentGroup.ItemTextBaseProps>
>(SegmentGroup.ItemText, 'itemText')

export const Label = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, SegmentGroup.LabelBaseProps>
>(SegmentGroup.Label, 'label')

export {
  SegmentGroupContext as Context,
  SegmentGroupItemHiddenInput as ItemHiddenInput,
} from '@ark-ui/react/segment-group'
