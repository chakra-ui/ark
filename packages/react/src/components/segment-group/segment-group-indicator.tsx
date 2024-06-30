import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { parts } from './segment-group.anatomy'
import { useSegmentGroupContext } from './use-segment-group-context'

export interface SegmentGroupIndicatorBaseProps extends PolymorphicProps {}
export interface SegmentGroupIndicatorProps
  extends HTMLProps<'div'>,
    SegmentGroupIndicatorBaseProps {}

export const SegmentGroupIndicator = forwardRef<HTMLDivElement, SegmentGroupIndicatorProps>(
  (props, ref) => {
    const segmentGroup = useSegmentGroupContext()
    const mergedProps = mergeProps(
      segmentGroup.getIndicatorProps(),
      parts.indicator.attrs as Record<string, string>,
      props,
    )
    return <ark.div {...mergedProps} ref={ref} />
  },
)

SegmentGroupIndicator.displayName = 'SegmentGroupIndicator'
