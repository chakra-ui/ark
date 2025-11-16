import type { ScrollbarProps } from '@zag-js/scroll-area'
import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useScrollAreaContext } from './use-scroll-area-context'
import { ScrollAreaScrollbarProvider } from './use-scroll-area-scrollbar-context'

export interface ScrollAreaScrollbarBaseProps extends ScrollbarProps, PolymorphicProps<'div'> {}
export interface ScrollAreaScrollbarProps extends Assign<HTMLProps<'div'>, ScrollAreaScrollbarBaseProps> {}

export const ScrollAreaScrollbar = (props: ScrollAreaScrollbarProps) => {
  const [scrollbarProps, localProps] = createSplitProps<ScrollbarProps>()(props, ['orientation'])
  const scrollArea = useScrollAreaContext()
  const mergedProps = mergeProps(() => scrollArea().getScrollbarProps(scrollbarProps), localProps)

  return (
    <ScrollAreaScrollbarProvider value={scrollbarProps}>
      <ark.div {...mergedProps} />
    </ScrollAreaScrollbarProvider>
  )
}
