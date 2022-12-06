import { ark, HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderRangeProps = HTMLArkProps<'div'>

export const RangeSliderRange = (props: RangeSliderRangeProps) => {
  const slider = useRangeSliderContext()

  return <ark.div {...slider().rangeProps} {...props} />
}
