import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSliderContext } from './slider-context'

type MarkerParams = { value: number }
export type SliderMarkerProps = Assign<HTMLArkProps<'span'>, MarkerParams>

export const SliderMarker = (props: SliderMarkerProps) => {
  const [markerParams, restProps] = createSplitProps<MarkerParams>()(props, ['value'])
  const api = useSliderContext()
  const markerProps = mergeProps(() => api().getMarkerProps(markerParams), restProps)
  return <ark.span {...markerProps} />
}
