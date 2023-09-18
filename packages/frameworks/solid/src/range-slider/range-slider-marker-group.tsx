import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderMarkerGroupProps = HTMLArkProps<'div'>

export const RangeSliderMarkerGroup = (props: RangeSliderMarkerGroupProps) => {
  const slider = useRangeSliderContext()
  const groupProps = mergeProps(() => slider().markerGroupProps, props)
  return <ark.div {...groupProps} />
}
