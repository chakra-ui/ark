import type { MarkerProps } from '@zag-js/slider'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderMarkerBaseProps extends MarkerProps, PolymorphicProps<'span'> {}
export interface SliderMarkerProps extends HTMLProps<'span'>, SliderMarkerBaseProps {}

export const SliderMarker = (props: SliderMarkerProps) => {
  const [markerProps, localProps] = createSplitProps<MarkerProps>()(props, ['value'])
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().getMarkerProps(markerProps), localProps)

  return <ark.span {...mergedProps} />
}
