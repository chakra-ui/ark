import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderLabelProps extends HTMLArkProps<'label'> {}

export const SliderLabel = forwardRef<HTMLLabelElement, SliderLabelProps>((props, ref) => {
  const context = useSliderContext()
  const mergedProps = mergeProps(context.labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})

SliderLabel.displayName = 'SliderLabel'
