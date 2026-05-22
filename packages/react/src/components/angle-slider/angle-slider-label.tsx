'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'

export interface AngleSliderLabelBaseProps extends PolymorphicProps {}
export interface AngleSliderLabelProps extends HTMLProps<'label'>, AngleSliderLabelBaseProps {}

export const AngleSliderLabel = ({ ref, ...props }: AngleSliderLabelProps) => {
  const angleSlider = useAngleSliderContext()
  const mergedProps = mergeProps(angleSlider.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
}

AngleSliderLabel.displayName = 'AngleSliderLabel'
