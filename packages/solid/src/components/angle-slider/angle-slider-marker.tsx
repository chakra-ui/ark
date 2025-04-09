import type { MarkerProps } from '@zag-js/angle-slider'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useAngleSliderContext } from './use-angle-slider-context'

export interface AngleSliderMarkerBaseProps extends PolymorphicProps<'div'>, MarkerProps {}
export interface AngleSliderMarkerProps extends HTMLProps<'div'>, AngleSliderMarkerBaseProps {}

export const AngleSliderMarker = (props: AngleSliderMarkerProps) => {
  const [markerProps, localProps] = createSplitProps<MarkerProps>()(props, ['value'])
  const api = useAngleSliderContext()
  const mergedProps = mergeProps(() => api().getMarkerProps(markerProps), localProps)

  return <ark.div {...mergedProps} />
}
