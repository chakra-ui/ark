import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSliderContext } from './slider-context'

type MarkerProps = {
  value: number
}

export type SliderMarkerProps = HTMLArkProps<'span', MarkerProps>

export const SliderMarker = forwardRef<'span', MarkerProps>((props, ref) => {
  const { value, ...spanProps } = props
  const { getMarkerProps } = useSliderContext()
  const mergedProps = mergeProps(getMarkerProps({ value }), spanProps)
  return <ark.span {...mergedProps} ref={ref} />
})
