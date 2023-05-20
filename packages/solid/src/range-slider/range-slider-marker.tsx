import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useRangeSliderContext } from './range-slider-context'

type GetMarkerPropsArgs = { value: number }
export type RangeSliderMarkerProps = Assign<HTMLArkProps<'span'>, GetMarkerPropsArgs>

export const RangeSliderMarker = (props: RangeSliderMarkerProps) => {
  const [markerParams, spanProps] = createSplitProps<GetMarkerPropsArgs>()(props, ['value'])

  const api = useRangeSliderContext()

  const markerProps = mergeProps(() => api().getMarkerProps(markerParams), spanProps)
  return <ark.span {...markerProps} />
}
