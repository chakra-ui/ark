import { forwardRef } from '@polymorphic-factory/react'
import { ark, HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderThumbProps = HTMLArkProps<'div'>

export const SliderThumb = forwardRef<'div', SliderThumbProps>((props, ref) => {
  const { thumbProps } = useSliderContext()
  return <ark.div {...thumbProps} {...props} ref={ref} />
})
