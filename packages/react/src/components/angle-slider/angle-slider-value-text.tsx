'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useAngleSliderContext } from './use-angle-slider-context.ts'

export interface AngleSliderValueTextBaseProps extends PolymorphicProps {}
export interface AngleSliderValueTextProps extends HTMLProps<'div'>, AngleSliderValueTextBaseProps {}

export const AngleSliderValueText = forwardRef<HTMLDivElement, AngleSliderValueTextProps>((props, ref) => {
  const angleSlider = useAngleSliderContext()
  const mergedProps = mergeProps(angleSlider.getValueTextProps(), props)

  return (
    <ark.div {...mergedProps} ref={ref}>
      {props.children || angleSlider.valueAsDegree}
    </ark.div>
  )
})

AngleSliderValueText.displayName = 'AngleSliderValueText'
