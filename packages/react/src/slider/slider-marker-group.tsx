import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderMarkerGroupProps = HTMLArkProps<'div'>

export const SliderMarkerGroup = forwardRef<'div', SliderMarkerGroupProps>((props, ref) => {
  const { markerGroupProps } = useSliderContext()
  const mergedProps = mergeProps(markerGroupProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
