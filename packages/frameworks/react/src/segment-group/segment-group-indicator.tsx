import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'

export interface SegmentGroupIndicatorProps extends HTMLArkProps<'div'> {}

export const SegmentGroupIndicator = forwardRef<HTMLDivElement, SegmentGroupIndicatorProps>(
  (props, ref) => {
    const context = useSegmentGroupContext()
    const mergedProps = mergeProps(
      context.indicatorProps,
      segmentGroupAnatomy.build().indicator.attrs as Record<string, string>,
      props,
    )
    return <ark.div {...mergedProps} ref={ref} />
  },
)

SegmentGroupIndicator.displayName = 'SegmentGroupIndicator'
