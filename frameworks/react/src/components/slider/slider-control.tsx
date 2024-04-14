import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderControlProps extends HTMLArkProps<'div'> {}

export const SliderControl = forwardRef<HTMLDivElement, SliderControlProps>((props, ref) => {
  const slider = useSliderContext()
  const mergedProps = mergeProps(slider.controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

SliderControl.displayName = 'SliderControl'
