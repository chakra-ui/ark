import type { ThumbProps } from '@zag-js/slider'
import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { createSplitProps } from '~/utils/create-split-props'
import { useSliderContext } from './use-slider-context'

export interface SliderThumbProps extends Assign<HTMLArkProps<'div'>, ThumbProps> {}

export const SliderThumb = (props: SliderThumbProps) => {
  const [thumbProps, localProps] = createSplitProps<ThumbProps>()(props, ['index', 'name'])
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().getThumbProps(thumbProps), localProps)

  return <ark.div {...mergedProps} />
}
