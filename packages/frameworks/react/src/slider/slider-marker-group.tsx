import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export interface SliderMarkerGroupProps extends HTMLArkProps<'div'> {}

export const SliderMarkerGroup = forwardRef<HTMLDivElement, SliderMarkerGroupProps>(
  (props, ref) => {
    const api = useSliderContext()
    const mergedProps = mergeProps(api.markerGroupProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

SliderMarkerGroup.displayName = 'SliderMarkerGroup'
