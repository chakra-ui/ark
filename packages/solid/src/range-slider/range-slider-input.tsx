import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

type RangeSliderInputParams = { index: number }
export type RangeSliderInputProps = HTMLArkProps<'input'> & RangeSliderInputParams

export const RangeSliderInput = (props: RangeSliderInputProps) => {
  const [inputParams, inputProps] = createSplitProps<RangeSliderInputParams>()(props, ['index'])
  const slider = useRangeSliderContext()

  return <ark.input {...slider().getInputProps(inputParams.index)} {...inputProps} />
}
