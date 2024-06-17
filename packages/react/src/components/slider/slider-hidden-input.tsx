import { mergeProps } from '@zag-js/react'
import { type InputHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'
import { useSliderThumbPropsContext } from './use-slider-thumb-props-context'

export interface SliderHiddenInputBaseProps extends PolymorphicProps {}
export interface SliderHiddenInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    SliderHiddenInputBaseProps {}

export const SliderHiddenInput = forwardRef<HTMLInputElement, SliderHiddenInputProps>(
  (props, ref) => {
    const slider = useSliderContext()
    const thumbProps = useSliderThumbPropsContext()
    const mergedProps = mergeProps(slider.getHiddenInputProps(thumbProps), props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

SliderHiddenInput.displayName = 'SliderHiddenInput'
