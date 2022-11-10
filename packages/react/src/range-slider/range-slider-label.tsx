import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderLabelProps = HTMLArkProps<'label'>

export const RangeSliderLabel = forwardRef<'label', RangeSliderLabelProps>((props, ref) => {
  const { labelProps } = useRangeSliderContext()
  const mergedProps = mergeProps(labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})
