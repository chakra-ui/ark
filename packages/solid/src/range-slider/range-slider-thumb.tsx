import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useRangeSliderContext } from './range-slider-context'

type RangeSliderThumbParams = { index: number }

export type RangeSliderThumbProps = Assign<HTMLArkProps<'div'>, RangeSliderThumbParams>

export const RangeSliderThumb = (props: RangeSliderThumbProps) => {
  const [thumbParams, localProps] = createSplitProps<RangeSliderThumbParams>()(props, ['index'])
  const api = useRangeSliderContext()
  const mergedProps = mergeProps(() => api().getThumbProps(thumbParams.index), localProps)

  return (
    <>
      <ark.div {...mergedProps} />
      <input {...api().getHiddenInputProps(thumbParams.index)} />
    </>
  )
}
