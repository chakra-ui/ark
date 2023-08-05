import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderHiddenInputProps = ComponentPropsWithoutRef<typeof ark.input>

export const SliderHiddenInput = forwardRef<HTMLInputElement, SliderHiddenInputProps>(
  (props, ref) => {
    const { hiddenInputProps } = useSliderContext()
    const mergedProps = mergeProps(hiddenInputProps, props)
    return <ark.input {...mergedProps} ref={ref} />
  },
)

SliderHiddenInput.displayName = 'SliderHiddenInput'
