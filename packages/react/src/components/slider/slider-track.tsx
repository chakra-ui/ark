'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderTrackBaseProps extends PolymorphicProps {}
export interface SliderTrackProps extends HTMLProps<'div'>, SliderTrackBaseProps {}

export const SliderTrack = ({ ref, ...props }: SliderTrackProps) => {
  const slider = useSliderContext()
  const mergedProps = mergeProps(slider.getTrackProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

SliderTrack.displayName = 'SliderTrack'
