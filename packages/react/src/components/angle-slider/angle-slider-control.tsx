'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useAngleSliderContext } from './use-angle-slider-context.ts'

export interface AngleSliderControlBaseProps extends PolymorphicProps {}
export interface AngleSliderControlProps extends HTMLProps<'div'>, AngleSliderControlBaseProps {}

export const AngleSliderControl = forwardRef<HTMLDivElement, AngleSliderControlProps>((props, ref) => {
  const angleSlider = useAngleSliderContext()
  const mergedProps = mergeProps(angleSlider.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

AngleSliderControl.displayName = 'AngleSliderControl'
