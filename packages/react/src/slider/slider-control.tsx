import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderControlProps = ComponentPropsWithoutRef<typeof ark.div>

export const SliderControl = forwardRef<HTMLDivElement, SliderControlProps>((props, ref) => {
  const { controlProps } = useSliderContext()
  const mergedProps = mergeProps(controlProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})

SliderControl.displayName = 'SliderControl'
