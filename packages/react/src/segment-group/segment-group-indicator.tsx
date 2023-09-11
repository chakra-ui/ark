import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export type SegmentGroupIndicatorProps = HtmlArkProps<'div'>

export const SegmentGroupIndicator = forwardRef<HTMLDivElement, SegmentGroupIndicatorProps>(
  (props, ref) => {
    const { indicatorProps } = useSegmentGroupContext()
    const mergedProps = mergeProps(indicatorProps, props)

    return <ark.div {...mergedProps} {...parts.indicator.attrs} ref={ref} />
  },
)

SegmentGroupIndicator.displayName = 'SegmentGroupIndicator'
