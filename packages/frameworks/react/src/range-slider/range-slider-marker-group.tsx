import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export interface RangeSliderMarkerGroupProps extends HTMLArkProps<'div'> {}

export const RangeSliderMarkerGroup = forwardRef<HTMLDivElement, RangeSliderMarkerGroupProps>(
  (props, ref) => {
    const api = useRangeSliderContext()
    const mergedProps = mergeProps(api.markerGroupProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

RangeSliderMarkerGroup.displayName = 'RangeSliderMarkerGroup'
