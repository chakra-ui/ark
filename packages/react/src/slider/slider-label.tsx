import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderLabelProps = HtmlArkProps<'label'>

export const SliderLabel = forwardRef<HTMLLabelElement, SliderLabelProps>((props, ref) => {
  const { labelProps } = useSliderContext()
  const mergedProps = mergeProps(labelProps, props)
  return <ark.label {...mergedProps} ref={ref} />
})

SliderLabel.displayName = 'SliderLabel'
