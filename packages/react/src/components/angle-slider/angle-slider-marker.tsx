import type { MarkerProps } from '@zag-js/angle-slider'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'

export interface AngleSliderMarkerBaseProps extends MarkerProps, PolymorphicProps {}
export interface AngleSliderMarkerProps extends Assign<HTMLProps<'div'>, AngleSliderMarkerBaseProps> {}

export const AngleSliderMarker = forwardRef<HTMLDivElement, AngleSliderMarkerProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<MarkerProps>()(props, ['value'])

  const angleSlider = useAngleSliderContext()
  const mergedProps = mergeProps(angleSlider.getMarkerProps(itemProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

AngleSliderMarker.displayName = 'AngleSliderMarker'
