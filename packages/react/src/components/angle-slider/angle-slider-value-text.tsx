'use client'

import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'

export interface AngleSliderValueTextBaseProps extends PolymorphicProps {}
export interface AngleSliderValueTextProps extends HTMLProps<'div'>, AngleSliderValueTextBaseProps {}

export const AngleSliderValueText = ({ ref, ...props }: AngleSliderValueTextProps) => {
  const angleSlider = useAngleSliderContext()
  return (
    <ark.div {...props} ref={ref}>
      {props.children || angleSlider.valueAsDegree}
    </ark.div>
  )
}

AngleSliderValueText.displayName = 'AngleSliderValueText'
