import type { MarkerProps } from '@zag-js/angle-slider'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useAngleSliderContext } from './use-angle-slider-context.ts'

export interface AngleSliderMarkerBaseProps extends PolymorphicProps<'span'>, MarkerProps {}
export interface AngleSliderMarkerProps extends HTMLProps<'span'>, AngleSliderMarkerBaseProps {}

export const AngleSliderMarker = (props: AngleSliderMarkerProps) => {
  const [markerProps, localProps] = createSplitProps<MarkerProps>()(props, ['value'])
  const api = useAngleSliderContext()
  const mergedProps = mergeProps(() => api().getMarkerProps(markerProps), localProps)

  return <ark.span {...mergedProps} />
}
