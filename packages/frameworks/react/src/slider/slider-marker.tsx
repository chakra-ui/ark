import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSliderContext } from './slider-context'

export interface SliderMarkerProps extends Assign<HTMLArkProps<'span'>, { value: number }> {}

export const SliderMarker = forwardRef<HTMLSpanElement, SliderMarkerProps>((props, ref) => {
  const { value, ...spanProps } = props
  const api = useSliderContext()
  const mergedProps = mergeProps(api.getMarkerProps({ value }), spanProps)

  return <ark.span {...mergedProps} ref={ref} />
})

SliderMarker.displayName = 'SliderMarker'
