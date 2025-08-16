import { mergeProps } from '@zag-js/solid'
import type { Orientation } from '@zag-js/types'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useScrollAreaContext } from './use-scroll-area-context'

interface ThumbProps {
  orientation?: Orientation
}

export interface ScrollAreaThumbBaseProps extends ThumbProps, PolymorphicProps<'div'> {}
export interface ScrollAreaThumbProps extends Assign<HTMLProps<'div'>, ScrollAreaThumbBaseProps> {}

export const ScrollAreaThumb = (props: ScrollAreaThumbProps) => {
  const [thumbProps, localProps] = createSplitProps<ThumbProps>()(props, ['orientation'])
  const scrollAreaApi = useScrollAreaContext()
  const mergedProps = mergeProps(() => scrollAreaApi().getThumbProps(thumbProps), localProps)

  return <ark.div {...mergedProps} />
}
