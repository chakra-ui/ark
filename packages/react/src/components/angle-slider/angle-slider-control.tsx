'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'

export interface AngleSliderControlBaseProps extends PolymorphicProps {}
export interface AngleSliderControlProps extends HTMLProps<'div'>, AngleSliderControlBaseProps {}

export const AngleSliderControl = ({ ref, ...props }: AngleSliderControlProps) => {
  const angleSlider = useAngleSliderContext()
  const mergedProps = mergeProps(angleSlider.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

AngleSliderControl.displayName = 'AngleSliderControl'
