import { forwardRef, type Assign } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderMarkerProps = Assign<HTMLArkProps<'span'>, { value: number }>

export const RangeSliderMarker = forwardRef<'span', RangeSliderMarkerProps>((props, ref) => {
  const { value, ...spanProps } = props
  const { getMarkerProps } = useRangeSliderContext()
  const mergedProps = mergeProps(getMarkerProps({ value }), spanProps)

  return <ark.span {...mergedProps} ref={ref} />
})
