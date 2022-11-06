import { forwardRef } from '@polymorphic-factory/react'
import { ark, HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderOutputProps = HTMLArkProps<'output'>

export const SliderOutput = forwardRef<'output', SliderOutputProps>((props, ref) => {
  const { outputProps } = useSliderContext()
  return <ark.output {...outputProps} {...props} ref={ref} />
})
