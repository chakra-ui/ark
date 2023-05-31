import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderControlProps = HTMLArkProps<'div'>

export const RangeSliderControl = forwardRef<'div', RangeSliderControlProps>((props, ref) => {
  const { controlProps } = useRangeSliderContext()
  const mergedProps = mergeProps(controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
