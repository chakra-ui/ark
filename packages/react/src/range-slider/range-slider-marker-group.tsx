import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderMarkerGroupProps = HTMLArkProps<'div'>

export const RangeSliderMarkerGroup = forwardRef<'div', RangeSliderMarkerGroupProps>(
  (props, ref) => {
    const { markerGroupProps } = useRangeSliderContext()
    const mergedProps = mergeProps(markerGroupProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)
