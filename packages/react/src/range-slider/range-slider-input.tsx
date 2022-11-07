import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderInputProps = HTMLArkProps<'input'>

export const RangeSliderInput = forwardRef<'input', RangeSliderInputProps>((props, ref) => {
  const { inputProps } = useRangeSliderContext()
  const mergedProps = mergeProps(inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})
