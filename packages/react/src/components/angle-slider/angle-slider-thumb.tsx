'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'

export interface AngleSliderThumbBaseProps extends PolymorphicProps {}
export interface AngleSliderThumbProps extends HTMLProps<'div'>, AngleSliderThumbBaseProps {}

export const AngleSliderThumb = ({ ref, ...props }: AngleSliderThumbProps) => {
  const angleSlider = useAngleSliderContext()
  const mergedProps = mergeProps(angleSlider.getThumbProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

AngleSliderThumb.displayName = 'AngleSliderThumb'
