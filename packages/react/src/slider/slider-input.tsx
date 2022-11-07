import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderInputProps = HTMLArkProps<'input'>

export const SliderInput = forwardRef<'input', SliderInputProps>((props, ref) => {
  const { inputProps } = useSliderContext()
  const mergedProps = mergeProps(inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})
