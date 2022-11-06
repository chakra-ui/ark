import { forwardRef } from '@polymorphic-factory/react'
import { ark, HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderRangeProps = HTMLArkProps<'div'>

export const SliderRange = forwardRef<'div', SliderRangeProps>((props, ref) => {
  const { rangeProps } = useSliderContext()
  return <ark.div {...rangeProps} {...props} ref={ref} />
})
