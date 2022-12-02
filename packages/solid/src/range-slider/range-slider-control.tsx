import { ark, HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderControlProps = HTMLArkProps<'div'>

export const RangeSliderControl = (props: RangeSliderControlProps) => {
  const slider = useRangeSliderContext()

  return <ark.div {...slider().controlProps} {...props} />
}
