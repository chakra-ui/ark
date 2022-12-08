import type { Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

type GetMarkerPropsArgs = { value: number }
export type RangeSliderMarkerProps = Assign<HTMLArkProps<'span'>, GetMarkerPropsArgs>

export const RangeSliderMarker = (props: RangeSliderMarkerProps) => {
  const [markerProps, spanProps] = createSplitProps<GetMarkerPropsArgs>()(props, ['value'])
  const slider = useRangeSliderContext()

  return <ark.span {...slider().getMarkerProps(markerProps)} {...spanProps} />
}
