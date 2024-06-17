import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderMarkerGroupBaseProps extends PolymorphicProps {}
export interface SliderMarkerGroupProps
  extends HTMLAttributes<HTMLDivElement>,
    SliderMarkerGroupBaseProps {}

export const SliderMarkerGroup = forwardRef<HTMLDivElement, SliderMarkerGroupProps>(
  (props, ref) => {
    const slider = useSliderContext()
    const mergedProps = mergeProps(slider.getMarkerGroupProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

SliderMarkerGroup.displayName = 'SliderMarkerGroup'
