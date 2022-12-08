import type { Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

type GetMarkerPropsArgs = { value: number }
export type SliderMarkerProps = Assign<HTMLArkProps<'span'>, GetMarkerPropsArgs>

export const SliderMarker = (props: SliderMarkerProps) => {
  const [markerProps, spanProps] = createSplitProps<GetMarkerPropsArgs>()(props, ['value'])
  const slider = useSliderContext()

  return <ark.span {...slider().getMarkerProps(markerProps)} {...spanProps} />
}
