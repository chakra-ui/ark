import { mergeProps } from '@zag-js/react'
import type { MarkerProps } from '@zag-js/slider'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderMarkerBaseProps extends MarkerProps {}
export interface SliderMarkerProps extends Assign<HTMLArkProps<'span'>, SliderMarkerBaseProps> {}

export const SliderMarker = forwardRef<HTMLSpanElement, SliderMarkerProps>((props, ref) => {
  const [markerProps, localProps] = createSplitProps<MarkerProps>()(props, ['value'])
  const slider = useSliderContext()
  const mergedProps = mergeProps(slider.getMarkerProps(markerProps), localProps)

  return <ark.span {...mergedProps} ref={ref} />
})

SliderMarker.displayName = 'SliderMarker'
