import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderControlProps = HTMLArkProps<'div'>

export const RangeSliderControl = (props: RangeSliderControlProps) => {
  const slider = useRangeSliderContext()
  const controlProps = mergeProps(() => slider().controlProps, props)
  return <ark.div {...controlProps} />
}
