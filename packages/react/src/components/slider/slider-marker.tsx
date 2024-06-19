import { mergeProps } from '@zag-js/react'
import type { MarkerProps } from '@zag-js/slider'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderMarkerBaseProps extends MarkerProps, PolymorphicProps {}
export interface SliderMarkerProps extends HTMLProps<'span'>, SliderMarkerBaseProps {}

export const SliderMarker = forwardRef<HTMLSpanElement, SliderMarkerProps>((props, ref) => {
  const [markerProps, localProps] = createSplitProps<MarkerProps>()(props, ['value'])
  const slider = useSliderContext()
  const mergedProps = mergeProps(slider.getMarkerProps(markerProps), localProps)

  return <ark.span {...mergedProps} ref={ref} />
})

SliderMarker.displayName = 'SliderMarker'
