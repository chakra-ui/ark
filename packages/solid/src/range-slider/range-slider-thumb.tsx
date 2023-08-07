import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useRangeSliderContext } from './range-slider-context'

type RangeSliderThumbParams = { index: number }

export type RangeSliderThumbProps = Assign<HTMLArkProps<'div'>, RangeSliderThumbParams>

export const RangeSliderThumb = (props: RangeSliderThumbProps) => {
  const [thumbParams, restProps] = createSplitProps<RangeSliderThumbParams>()(props, ['index'])

  const api = useRangeSliderContext()
  const thumbProps = mergeProps(() => api().getThumbProps(thumbParams.index), restProps)

  return (
    <>
      <ark.div {...thumbProps} />
      <input {...api().getHiddenInputProps(thumbParams.index)} />
    </>
  )
}
