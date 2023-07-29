import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderMarkerGroupProps = ComponentPropsWithoutRef<typeof ark.div>

export const RangeSliderMarkerGroup = forwardRef<HTMLDivElement, RangeSliderMarkerGroupProps>(
  (props, ref) => {
    const { markerGroupProps } = useRangeSliderContext()
    const mergedProps = mergeProps(markerGroupProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

RangeSliderMarkerGroup.displayName = 'RangeSliderMarkerGroup'
