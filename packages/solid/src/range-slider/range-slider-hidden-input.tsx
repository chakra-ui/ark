import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useRangeSliderContext } from './range-slider-context'

type RangeSliderThumbParams = { index: number }
export type RangeSliderHiddenInputProps = Assign<HTMLArkProps<'input'>, RangeSliderThumbParams>

export const RangeSliderHiddenInput = (props: RangeSliderHiddenInputProps) => {
  const [hiddenInput, restProps] = createSplitProps<RangeSliderThumbParams>()(props, ['index'])
  const api = useRangeSliderContext()
  const inputProps = mergeProps(() => api().getHiddenInputProps(hiddenInput.index), restProps)

  return <ark.input {...inputProps} />
}
