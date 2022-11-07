import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderOutputProps = HTMLArkProps<'output'>

export const SliderOutput = forwardRef<'output', SliderOutputProps>((props, ref) => {
  const { outputProps } = useSliderContext()
  const mergedProps = mergeProps(outputProps, props)

  return <ark.output {...mergedProps} ref={ref} />
})
