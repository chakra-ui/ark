import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { useSliderContext } from './slider-context'

export type SliderMarkerProps = Assign<HTMLArkProps<'span'>, { value: number }>

export const SliderMarker = forwardRef<'span', { value: number }>((props, ref) => {
  const { value, ...spanProps } = props
  const { getMarkerProps } = useSliderContext()
  const mergedProps = mergeProps(getMarkerProps({ value }), spanProps)
  return <ark.span {...mergedProps} ref={ref} />
})
