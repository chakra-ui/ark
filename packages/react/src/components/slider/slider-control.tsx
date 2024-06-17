import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderControlBaseProps extends PolymorphicProps {}
export interface SliderControlProps
  extends HTMLAttributes<HTMLDivElement>,
    SliderControlBaseProps {}

export const SliderControl = forwardRef<HTMLDivElement, SliderControlProps>((props, ref) => {
  const slider = useSliderContext()
  const mergedProps = mergeProps(slider.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

SliderControl.displayName = 'SliderControl'
