import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderRangeBaseProps extends PolymorphicProps {}
export interface SliderRangeProps extends HTMLAttributes<HTMLDivElement>, SliderRangeBaseProps {}

export const SliderRange = forwardRef<HTMLDivElement, SliderRangeProps>((props, ref) => {
  const slider = useSliderContext()
  const mergedProps = mergeProps(slider.getRangeProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

SliderRange.displayName = 'SliderRange'
