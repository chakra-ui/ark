import { mergeProps } from '@zag-js/react'
import type { MarkerProps } from '@zag-js/slider'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSliderContext } from './use-slider-context'

export interface SliderMarkerProps extends Assign<HTMLArkProps<'span'>, MarkerProps> {}

export const SliderMarker = forwardRef<HTMLSpanElement, SliderMarkerProps>((props, ref) => {
  const { value, ...spanProps } = props
  const context = useSliderContext()
  const mergedProps = mergeProps(context.getMarkerProps({ value }), spanProps)

  return <ark.span {...mergedProps} ref={ref} />
})

SliderMarker.displayName = 'SliderMarker'
