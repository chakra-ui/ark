import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderControlProps extends HTMLArkProps<'div'> {}

export const SliderControl = forwardRef<HTMLDivElement, SliderControlProps>((props, ref) => {
  const context = useSliderContext()
  const mergedProps = mergeProps(context.controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

SliderControl.displayName = 'SliderControl'
