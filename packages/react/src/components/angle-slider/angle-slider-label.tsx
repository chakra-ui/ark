import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'

export interface AngleSliderLabelBaseProps extends PolymorphicProps {}
export interface AngleSliderLabelProps extends HTMLProps<'span'>, AngleSliderLabelBaseProps {}

export const AngleSliderLabel = forwardRef<HTMLLabelElement, AngleSliderLabelProps>((props, ref) => {
  const angleSlider = useAngleSliderContext()
  const mergedProps = mergeProps(angleSlider.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

AngleSliderLabel.displayName = 'AngleSliderLabel'
