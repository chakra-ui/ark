import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'

export interface AngleSliderMarkerGroupBaseProps extends PolymorphicProps {}
export interface AngleSliderMarkerGroupProps extends HTMLProps<'div'>, AngleSliderMarkerGroupBaseProps {}

export const AngleSliderMarkerGroup = forwardRef<HTMLDivElement, AngleSliderMarkerGroupProps>((props, ref) => {
  const angleSlider = useAngleSliderContext()
  const mergedProps = mergeProps(angleSlider.getMarkerGroupProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

AngleSliderMarkerGroup.displayName = 'AngleSliderMarkerGroup'
