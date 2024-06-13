import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'
import { useSliderThumbPropsContext } from './use-slider-thumb-props-context'

export type SliderHiddenInputBaseProps = {}
export interface SliderHiddenInputProps extends HTMLArkProps<'input'>, SliderHiddenInputBaseProps {}

export const SliderHiddenInput = forwardRef<HTMLInputElement, SliderHiddenInputProps>(
  (props, ref) => {
    const slider = useSliderContext()
    const thumbProps = useSliderThumbPropsContext()
    const mergedProps = mergeProps(slider.getHiddenInputProps(thumbProps), props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

SliderHiddenInput.displayName = 'SliderHiddenInput'
