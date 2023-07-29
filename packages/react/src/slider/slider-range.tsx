import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderRangeProps = ComponentPropsWithoutRef<typeof ark.div>

export const SliderRange = forwardRef<HTMLDivElement, SliderRangeProps>((props, ref) => {
  const { rangeProps } = useSliderContext()
  const mergedProps = mergeProps(rangeProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})

SliderRange.displayName = 'SliderRange'
