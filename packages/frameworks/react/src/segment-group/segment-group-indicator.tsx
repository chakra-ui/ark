import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export interface SegmentGroupIndicatorProps extends HTMLArkProps<'div'> {}

export const SegmentGroupIndicator = forwardRef<HTMLDivElement, SegmentGroupIndicatorProps>(
  (props, ref) => {
    const api = useSegmentGroupContext()
    const mergedProps = mergeProps(
      api.indicatorProps,
      parts.indicator.attrs as Record<string, string>,
      props,
    )
    return <ark.div {...mergedProps} ref={ref} />
  },
)

SegmentGroupIndicator.displayName = 'SegmentGroupIndicator'
