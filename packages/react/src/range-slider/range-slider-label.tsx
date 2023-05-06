import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderLabelProps = HTMLArkProps<'label'>

export const RangeSliderLabel = forwardRef<'label', RangeSliderLabelProps>((props, ref) => {
  const { labelProps } = useRangeSliderContext()
  const mergedProps = mergeProps(labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})
