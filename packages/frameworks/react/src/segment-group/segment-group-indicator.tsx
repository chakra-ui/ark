import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'

export type SegmentGroupIndicatorProps = HTMLArkProps<'div'>

export const SegmentGroupIndicator = forwardRef<HTMLDivElement, SegmentGroupIndicatorProps>(
  (props, ref) => {
    const { indicatorProps } = useSegmentGroupContext()
    const mergedProps = mergeProps(indicatorProps, props)

    return <ark.div {...mergedProps} {...segmentGroupAnatomy.build().indicator.attrs} ref={ref} />
  },
)

SegmentGroupIndicator.displayName = 'SegmentGroupIndicator'
