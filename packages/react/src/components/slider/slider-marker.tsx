'use client'

import { mergeProps } from '@zag-js/react'
import type { MarkerProps, MarkerState } from '@zag-js/slider'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useSliderContext } from './use-slider-context.ts'

export interface SliderMarkerState extends MarkerState {}

export interface SliderMarkerBaseProps extends MarkerProps, PolymorphicProps<SliderMarkerState> {}
export interface SliderMarkerProps extends HTMLProps<'span'>, SliderMarkerBaseProps {}

const splitMarkerProps = createSplitProps<MarkerProps>()

export const SliderMarker = forwardRef<HTMLSpanElement, SliderMarkerProps>((props, ref) => {
  const [markerProps, localProps] = splitMarkerProps(props, ['value'])
  const slider = useSliderContext()
  const mergedProps = mergeProps(slider.getMarkerProps(markerProps), localProps)

  return <ark.span {...mergedProps} ref={ref} state={slider.getMarkerState(markerProps)} />
})

SliderMarker.displayName = 'SliderMarker'
