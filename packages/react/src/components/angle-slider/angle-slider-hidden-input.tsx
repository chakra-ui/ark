'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'

export interface AngleSliderHiddenInputBaseProps extends PolymorphicProps {}
export interface AngleSliderHiddenInputProps extends HTMLProps<'input'>, AngleSliderHiddenInputBaseProps {}

export const AngleSliderHiddenInput = ({ ref, ...props }: AngleSliderHiddenInputProps) => {
  const angleSlider = useAngleSliderContext()
  const mergedProps = mergeProps(angleSlider.getHiddenInputProps(), props)

  return <ark.input {...mergedProps} ref={ref} />
}

AngleSliderHiddenInput.displayName = 'AngleSliderHiddenInput'
