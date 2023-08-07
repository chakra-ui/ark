import {
  SegmentGroup as ArkSegmentGroup,
  type SegmentGroupProps as ArkSegmentGroupProps,
} from '@ark-ui/react/src/segment-group'
import { segmentGroup, type SegmentGroupVariantProps } from 'panda/recipes'

export * from '@ark-ui/react/src/segment-group'

export type SegmentGroupProps = SegmentGroupVariantProps & ArkSegmentGroupProps

export const SegmentGroup = (props: SegmentGroupProps) => {
  const { size, ...rest } = props
  return <ArkSegmentGroup className={segmentGroup({ size })} {...rest} />
}
