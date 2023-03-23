import { ark, type HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderMarkerGroupProps = HTMLArkProps<'div'>

export const RangeSliderMarkerGroup = (props: RangeSliderMarkerGroupProps) => {
  const slider = useRangeSliderContext()

  return <ark.div {...slider().markerGroupProps} {...props} />
}
