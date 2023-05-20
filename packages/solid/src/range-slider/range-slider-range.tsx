import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderRangeProps = HTMLArkProps<'div'>

export const RangeSliderRange = (props: RangeSliderRangeProps) => {
  const slider = useRangeSliderContext()
  const rangeProps = mergeProps(() => slider().rangeProps, props)
  return <ark.div {...rangeProps} />
}
