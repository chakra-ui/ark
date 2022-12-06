import type { Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

type RangeSliderThumbParams = { index: number }
export type RangeSliderThumbProps = Assign<HTMLArkProps<'div'>, RangeSliderThumbParams>

export const RangeSliderThumb = (props: RangeSliderThumbProps) => {
  const [thumbParams, divProps] = createSplitProps<RangeSliderThumbParams>()(props, ['index'])
  const slider = useRangeSliderContext()

  return <ark.div {...slider().getThumbProps(thumbParams.index)} {...divProps} />
}
