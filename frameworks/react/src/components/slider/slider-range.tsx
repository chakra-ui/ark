import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderRangeProps extends HTMLArkProps<'div'> {}

export const SliderRange = forwardRef<HTMLDivElement, SliderRangeProps>((props, ref) => {
  const slider = useSliderContext()
  const mergedProps = mergeProps(slider.rangeProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

SliderRange.displayName = 'SliderRange'
