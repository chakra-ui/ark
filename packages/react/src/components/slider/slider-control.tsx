import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderControlBaseProps extends PolymorphicProps {}
export interface SliderControlProps extends HTMLProps<'div'>, SliderControlBaseProps {}

export const SliderControl = forwardRef<HTMLDivElement, SliderControlProps>((props, ref) => {
  const slider = useSliderContext()
  const mergedProps = mergeProps(slider.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

SliderControl.displayName = 'SliderControl'
