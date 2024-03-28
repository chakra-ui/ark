import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderRangeProps extends HTMLArkProps<'div'> {}

export const SliderRange = forwardRef<HTMLDivElement, SliderRangeProps>((props, ref) => {
  const context = useSliderContext()
  const mergedProps = mergeProps(context.rangeProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

SliderRange.displayName = 'SliderRange'
