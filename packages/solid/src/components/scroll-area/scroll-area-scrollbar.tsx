import type { ScrollbarProps, ScrollbarState } from '@zag-js/scroll-area'
import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useScrollAreaContext } from './use-scroll-area-context.ts'
import { ScrollAreaScrollbarProvider } from './use-scroll-area-scrollbar-context.ts'

export interface ScrollAreaScrollbarState extends ScrollbarState {}

export interface ScrollAreaScrollbarBaseProps
  extends ScrollbarProps, PolymorphicProps<'div', ScrollAreaScrollbarState> {}
export interface ScrollAreaScrollbarProps extends Assign<HTMLProps<'div'>, ScrollAreaScrollbarBaseProps> {}

export const ScrollAreaScrollbar = (props: ScrollAreaScrollbarProps) => {
  const [scrollbarProps, localProps] = createSplitProps<ScrollbarProps>()(props, ['orientation'])
  const scrollArea = useScrollAreaContext()
  const mergedProps = mergeProps(() => scrollArea().getScrollbarProps(scrollbarProps), localProps)

  return (
    <ScrollAreaScrollbarProvider value={scrollbarProps}>
      <ark.div {...mergedProps} state={scrollArea().getScrollbarState(scrollbarProps)} />
    </ScrollAreaScrollbarProvider>
  )
}
