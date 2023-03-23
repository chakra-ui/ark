import { forwardRef, type Assign } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderMarkerProps = Assign<HTMLArkProps<'span'>, { value: number }>

export const SliderMarker = forwardRef<'span', SliderMarkerProps>((props, ref) => {
  const { value, ...spanProps } = props
  const { getMarkerProps } = useSliderContext()
  const mergedProps = mergeProps(getMarkerProps({ value }), spanProps)

  return <ark.span {...mergedProps} ref={ref} />
})
