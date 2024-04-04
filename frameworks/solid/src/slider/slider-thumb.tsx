import type { ThumbProps } from '@zag-js/slider'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSliderContext } from './use-slider-context'

export interface SliderThumbProps extends Assign<HTMLArkProps<'div'>, ThumbProps> {}

export const SliderThumb = (props: SliderThumbProps) => {
  const [thumbProps, localProps] = createSplitProps<ThumbProps>()(props, ['index', 'name'])
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().getThumbProps(thumbProps), localProps)

  return <ark.div {...mergedProps()} />
}
