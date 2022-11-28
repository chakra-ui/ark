import { ark, type HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderLabelProps = HTMLArkProps<'label'>

export const RangeSliderLabel = (props: RangeSliderLabelProps) => {
  const slider = useRangeSliderContext()

  return <ark.label {...slider().labelProps} {...props} />
}
