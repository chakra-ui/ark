import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderRangeProps = HTMLArkProps<'div'>

export const RangeSliderRange = forwardRef<HTMLDivElement, RangeSliderRangeProps>((props, ref) => {
  const { rangeProps } = useRangeSliderContext()
  const mergedProps = mergeProps(rangeProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

RangeSliderRange.displayName = 'RangeSliderRange'
