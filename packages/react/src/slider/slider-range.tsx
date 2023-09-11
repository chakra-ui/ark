import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderRangeProps = HTMLArkProps<'div'>

export const SliderRange = forwardRef<HTMLDivElement, SliderRangeProps>((props, ref) => {
  const { rangeProps } = useSliderContext()
  const mergedProps = mergeProps(rangeProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})

SliderRange.displayName = 'SliderRange'
