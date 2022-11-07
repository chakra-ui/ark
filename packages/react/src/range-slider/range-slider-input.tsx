import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderInputProps = HTMLArkProps<'input'> & { index: number }

export const RangeSliderInput = forwardRef<'input', RangeSliderInputProps>((props, ref) => {
  const { index, ...inputProps } = props
  const { getInputProps } = useRangeSliderContext()
  const mergedProps = mergeProps(getInputProps(index), inputProps)

  return <ark.input {...mergedProps} ref={ref} />
})
