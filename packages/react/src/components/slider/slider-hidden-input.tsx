'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'
import { useSliderThumbPropsContext } from './use-slider-thumb-props-context'

export interface SliderHiddenInputBaseProps extends PolymorphicProps {}
export interface SliderHiddenInputProps extends HTMLProps<'input'>, SliderHiddenInputBaseProps {}

export const SliderHiddenInput = ({ ref, ...props }: SliderHiddenInputProps) => {
  const slider = useSliderContext()
  const thumbProps = useSliderThumbPropsContext()
  const mergedProps = mergeProps(slider.getHiddenInputProps(thumbProps), props)

  return <ark.input {...mergedProps} ref={ref} />
}

SliderHiddenInput.displayName = 'SliderHiddenInput'
