import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export interface SliderControlProps extends HTMLArkProps<'div'> {}

export const SliderControl = forwardRef<HTMLDivElement, SliderControlProps>((props, ref) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(api.controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

SliderControl.displayName = 'SliderControl'
