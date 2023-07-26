import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSliderContext } from './slider-context'

export type SliderLabelProps = HTMLArkProps<'label'>

export const SliderLabel = forwardRef<'label'>((props, ref) => {
  const { labelProps } = useSliderContext()
  const mergedProps = mergeProps(labelProps, props)
  return <ark.label {...mergedProps} ref={ref} />
})
