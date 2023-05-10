import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSliderContext } from './slider-context'

export type SliderControlProps = HTMLArkProps<'div'>

export const SliderControl = forwardRef<'div'>((props, ref) => {
  const { controlProps } = useSliderContext()
  const mergedProps = mergeProps(controlProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})
