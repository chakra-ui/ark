import * as Ark from '@ark-ui/react/segment-group'
import { styled } from 'styled-system/jsx'
import { segmentGroup, type SegmentGroupVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(segmentGroup)

export * from '@ark-ui/react/segment-group'
export type SegmentGroupProps = Ark.SegmentGroupProps & SegmentGroupVariantProps

const SegmentGroupRoot = withProvider(styled(Ark.SegmentGroup.Root), 'root')
export const SegmentGroupLabel = withContext(styled(Ark.SegmentGroup.Label), 'label')
export const SegmentGroupIndicator = withContext(styled(Ark.SegmentGroup.Indicator), 'indicator')
export const Segment = withContext(styled(Ark.SegmentGroup.Segment), 'radio')
export const SegmentLabel = withContext(styled(Ark.SegmentGroup.SegmentLabel), 'radioLabel')
export const SegmentControl = withContext(styled(Ark.SegmentGroup.SegmentControl), 'radioControl')

export const SegmentGroup = Object.assign(SegmentGroupRoot, {
  Root: SegmentGroupRoot,
  Label: SegmentGroupLabel,
  Indicator: SegmentGroupIndicator,
  Segment: Segment,
  SegmentLabel: SegmentLabel,
  SegmentControl: SegmentControl,
})
