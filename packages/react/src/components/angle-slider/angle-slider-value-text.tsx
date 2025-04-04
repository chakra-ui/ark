import { forwardRef } from 'react'
import { type HTMLProps, ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'

export interface AngleSliderValueTextProps extends HTMLProps<'div'> {}

export const AngleSliderValueText = forwardRef<HTMLDivElement, AngleSliderValueTextProps>((props, ref) => {
  const angleSlider = useAngleSliderContext()
  return (
    <ark.div {...props} ref={ref}>
      {props.children || angleSlider.valueAsDegree}
    </ark.div>
  )
})

AngleSliderValueText.displayName = 'AngleSliderValueText'
