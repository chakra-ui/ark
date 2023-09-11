import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderMarkerGroupProps = HtmlArkProps<'div'>

export const SliderMarkerGroup = forwardRef<HTMLDivElement, SliderMarkerGroupProps>(
  (props, ref) => {
    const { markerGroupProps } = useSliderContext()
    const mergedProps = mergeProps(markerGroupProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

SliderMarkerGroup.displayName = 'SliderMarkerGroup'
