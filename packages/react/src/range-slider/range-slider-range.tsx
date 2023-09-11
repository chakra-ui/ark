import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderRangeProps = HtmlArkProps<'div'>

export const RangeSliderRange = forwardRef<HTMLDivElement, RangeSliderRangeProps>((props, ref) => {
  const { rangeProps } = useRangeSliderContext()
  const mergedProps = mergeProps(rangeProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

RangeSliderRange.displayName = 'RangeSliderRange'
