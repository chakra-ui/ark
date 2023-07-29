import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderRangeProps = ComponentPropsWithoutRef<typeof ark.div>

export const RangeSliderRange = forwardRef<HTMLDivElement, RangeSliderRangeProps>((props, ref) => {
  const { rangeProps } = useRangeSliderContext()
  const mergedProps = mergeProps(rangeProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

RangeSliderRange.displayName = 'RangeSliderRange'
