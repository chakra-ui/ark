import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export type SliderLabelBaseProps = {}
export interface SliderLabelProps extends HTMLArkProps<'label'>, SliderLabelBaseProps {}

export const SliderLabel = forwardRef<HTMLLabelElement, SliderLabelProps>((props, ref) => {
  const slider = useSliderContext()
  const mergedProps = mergeProps(slider.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

SliderLabel.displayName = 'SliderLabel'
