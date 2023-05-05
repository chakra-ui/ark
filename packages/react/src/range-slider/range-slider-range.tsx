import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderRangeProps = HTMLArkProps<'div'>

export const RangeSliderRange = forwardRef<'div', RangeSliderRangeProps>((props, ref) => {
  const { rangeProps } = useRangeSliderContext()
  const mergedProps = mergeProps(rangeProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
