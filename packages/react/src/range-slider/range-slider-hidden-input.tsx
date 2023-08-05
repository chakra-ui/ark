import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { type Assign } from '../types'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderHiddenInputProps = Assign<
  ComponentPropsWithoutRef<typeof ark.input>,
  { index: number }
>

export const RangeSliderHiddenInput = forwardRef<HTMLInputElement, RangeSliderHiddenInputProps>(
  (props, ref) => {
    const { index, ...inputProps } = props
    const { getHiddenInputProps } = useRangeSliderContext()
    const mergedProps = mergeProps(getHiddenInputProps(index), inputProps)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

RangeSliderHiddenInput.displayName = 'RangeSliderHiddenInput'
