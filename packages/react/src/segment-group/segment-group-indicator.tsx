import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export type SegmentGroupIndicatorProps = ComponentPropsWithoutRef<typeof ark.div>

export const SegmentGroupIndicator = forwardRef<HTMLDivElement, SegmentGroupIndicatorProps>(
  (props, ref) => {
    const { indicatorProps } = useSegmentGroupContext()
    const mergedProps = mergeProps(indicatorProps, props)

    return <ark.div {...mergedProps} {...parts.indicator.attrs} ref={ref} />
  },
)

SegmentGroupIndicator.displayName = 'SegmentGroupIndicator'
