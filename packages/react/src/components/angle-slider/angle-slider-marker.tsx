'use client'

import type { MarkerProps, MarkerState } from '@zag-js/angle-slider'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useAngleSliderContext } from './use-angle-slider-context.ts'

export interface AngleSliderMarkerState extends MarkerState {}

export interface AngleSliderMarkerBaseProps extends MarkerProps, PolymorphicProps<AngleSliderMarkerState> {}
export interface AngleSliderMarkerProps extends Assign<HTMLProps<'div'>, AngleSliderMarkerBaseProps> {}

const splitMarkerProps = createSplitProps<MarkerProps>()

export const AngleSliderMarker = forwardRef<HTMLDivElement, AngleSliderMarkerProps>((props, ref) => {
  const [markerProps, localProps] = splitMarkerProps(props, ['value'])

  const angleSlider = useAngleSliderContext()
  const mergedProps = mergeProps(angleSlider.getMarkerProps(markerProps), localProps)

  return <ark.div {...mergedProps} ref={ref} state={angleSlider.getMarkerState(markerProps)} />
})

AngleSliderMarker.displayName = 'AngleSliderMarker'
