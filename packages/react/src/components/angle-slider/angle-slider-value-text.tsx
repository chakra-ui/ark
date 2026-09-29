'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useAngleSliderContext } from './use-angle-slider-context.ts'

export interface AngleSliderValueTextBaseProps extends PolymorphicProps {}
export interface AngleSliderValueTextProps extends HTMLProps<'span'>, AngleSliderValueTextBaseProps {}

export const AngleSliderValueText = forwardRef<HTMLSpanElement, AngleSliderValueTextProps>((props, ref) => {
  const angleSlider = useAngleSliderContext()
  return (
    <ark.span {...props} ref={ref}>
      {props.children || angleSlider.valueAsDegree}
    </ark.span>
  )
})

AngleSliderValueText.displayName = 'AngleSliderValueText'
