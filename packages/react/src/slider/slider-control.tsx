import { forwardRef } from '@polymorphic-factory/react'
import { ark, HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderControlProps = HTMLArkProps<'div'>

export const SliderControl = forwardRef<'div', SliderControlProps>((props, ref) => {
  const { controlProps } = useSliderContext()
  return <ark.div {...controlProps} {...props} ref={ref} />
})
