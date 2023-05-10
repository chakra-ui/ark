import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderLabelProps = HTMLArkProps<'label'>

export const RangeSliderLabel = (props: RangeSliderLabelProps) => {
  const slider = useRangeSliderContext()
  const labelProps = mergeProps(() => slider().labelProps, props)
  return <ark.label {...labelProps} />
}
