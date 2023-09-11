import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderControlProps = HTMLArkProps<'div'>

export const SliderControl = forwardRef<HTMLDivElement, SliderControlProps>((props, ref) => {
  const { controlProps } = useSliderContext()
  const mergedProps = mergeProps(controlProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})

SliderControl.displayName = 'SliderControl'
