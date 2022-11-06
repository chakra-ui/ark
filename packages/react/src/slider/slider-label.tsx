import { forwardRef } from '@polymorphic-factory/react'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderLabelProps = HTMLArkProps<'label'>

export const SliderLabel = forwardRef<'label', SliderLabelProps>((props, ref) => {
  const { labelProps } = useSliderContext()
  return <ark.label {...labelProps} {...props} ref={ref} />
})
