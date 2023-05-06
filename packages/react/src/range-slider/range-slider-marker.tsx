import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderMarkerProps = Assign<HTMLArkProps<'span'>, { value: number }>

export const RangeSliderMarker = forwardRef<'span', RangeSliderMarkerProps>((props, ref) => {
  const { value, ...spanProps } = props
  const { getMarkerProps } = useRangeSliderContext()
  const mergedProps = mergeProps(getMarkerProps({ value }), spanProps)

  return <ark.span {...mergedProps} ref={ref} />
})
