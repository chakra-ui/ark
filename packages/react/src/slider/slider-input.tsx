import { forwardRef } from '@polymorphic-factory/react'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderInputProps = HTMLArkProps<'input'>

export const SliderInput = forwardRef<'input', SliderInputProps>((props, ref) => {
  const { inputProps } = useSliderContext()
  return <ark.input {...inputProps} {...props} ref={ref} />
})
