import * as Ark from '@ark-ui/react/src/segment-group'
import { styled } from 'styled-system/jsx'
import { segmentGroup, type SegmentGroupVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(segmentGroup)

export * from '@ark-ui/react/src/segment-group'
export type SegmentGroupProps = Ark.SegmentGroupProps & SegmentGroupVariantProps

const SegmentGroupRoot = withProvider(styled(Ark.SegmentGroup.Root), 'root')
export const SegmentGroupLabel = withContext(styled(Ark.SegmentGroup.Label), 'label')
export const SegmentGroupIndicator = withContext(styled(Ark.SegmentGroup.Indicator), 'indicator')
export const SegmentGroupItem = withContext(styled(Ark.SegmentGroup.Item), 'radio')
export const SegmentGroupItemText = withContext(styled(Ark.SegmentGroup.ItemText), 'radioLabel')
export const SegmentGroupItemControl = withContext(
  styled(Ark.SegmentGroup.ItemControl),
  'radioControl',
)

export const SegmentGroup = Object.assign(SegmentGroupRoot, {
  Root: SegmentGroupRoot,
  Indicator: SegmentGroupIndicator,
  Item: SegmentGroupItem,
  ItemControl: SegmentGroupItemControl,
  ItemText: SegmentGroupItemText,
  Label: SegmentGroupLabel,
})
