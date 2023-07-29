import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import type { Assign } from '../types'
import { useSliderContext } from './slider-context'

export type SliderMarkerProps = Assign<ComponentPropsWithoutRef<typeof ark.span>, { value: number }>

export const SliderMarker = forwardRef<HTMLSpanElement, SliderMarkerProps>((props, ref) => {
  const { value, ...spanProps } = props
  const { getMarkerProps } = useSliderContext()
  const mergedProps = mergeProps(getMarkerProps({ value }), spanProps)
  return <ark.span {...mergedProps} ref={ref} />
})

SliderMarker.displayName = 'SliderMarker'
