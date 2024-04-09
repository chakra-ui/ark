import { mergeProps } from '@zag-js/react'
import type { MarkerProps } from '@zag-js/slider'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSliderContext } from './use-slider-context'

export interface SliderMarkerProps extends Assign<HTMLArkProps<'span'>, MarkerProps> {}

export const SliderMarker = forwardRef<HTMLSpanElement, SliderMarkerProps>((props, ref) => {
  const [markerProps, localProps] = createSplitProps<MarkerProps>()(props, ['value'])
  const slider = useSliderContext()
  const mergedProps = mergeProps(slider.getMarkerProps(markerProps), localProps)

  return <ark.span {...mergedProps} ref={ref} />
})

SliderMarker.displayName = 'SliderMarker'
