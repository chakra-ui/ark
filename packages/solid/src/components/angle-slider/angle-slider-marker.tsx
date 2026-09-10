import type { MarkerProps, MarkerState } from '@zag-js/angle-slider'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useAngleSliderContext } from './use-angle-slider-context.ts'

export interface AngleSliderMarkerState extends MarkerState {}

export interface AngleSliderMarkerBaseProps extends PolymorphicProps<'div', AngleSliderMarkerState>, MarkerProps {}
export interface AngleSliderMarkerProps extends HTMLProps<'div'>, AngleSliderMarkerBaseProps {}

export const AngleSliderMarker = (props: AngleSliderMarkerProps) => {
  const [markerProps, localProps] = createSplitProps<MarkerProps>()(props, ['value'])
  const api = useAngleSliderContext()
  const mergedProps = mergeProps(() => api().getMarkerProps(markerProps), localProps)

  return <ark.div {...mergedProps} state={api().getMarkerState(markerProps)} />
}
