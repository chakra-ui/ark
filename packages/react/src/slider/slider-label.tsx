import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderLabelProps = ComponentPropsWithoutRef<typeof ark.label>

export const SliderLabel = forwardRef<HTMLLabelElement, SliderLabelProps>((props, ref) => {
  const { labelProps } = useSliderContext()
  const mergedProps = mergeProps(labelProps, props)
  return <ark.label {...mergedProps} ref={ref} />
})

SliderLabel.displayName = 'SliderLabel'
