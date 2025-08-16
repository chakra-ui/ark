import { mergeProps } from '@zag-js/solid'
import type { Orientation } from '@zag-js/types'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useScrollAreaContext } from './use-scroll-area-context'

interface ScrollbarProps {
  orientation?: Orientation
}

export interface ScrollAreaScrollbarBaseProps extends ScrollbarProps, PolymorphicProps<'div'> {}
export interface ScrollAreaScrollbarProps extends Assign<HTMLProps<'div'>, ScrollAreaScrollbarBaseProps> {}

export const ScrollAreaScrollbar = (props: ScrollAreaScrollbarProps) => {
  const [scrollbarProps, localProps] = createSplitProps<ScrollbarProps>()(props, ['orientation'])
  const scrollAreaApi = useScrollAreaContext()
  const mergedProps = mergeProps(() => scrollAreaApi().getScrollbarProps(scrollbarProps), localProps)

  return <ark.div {...mergedProps} />
}
