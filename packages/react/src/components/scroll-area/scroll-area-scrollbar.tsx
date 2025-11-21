import { mergeProps } from '@zag-js/react'
import type { Orientation } from '@zag-js/types'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useScrollAreaContext } from './use-scroll-area-context'
import { ScrollAreaScrollbarProvider } from './use-scroll-area-scrollbar-context'

interface ScrollbarProps {
  orientation?: Orientation
}

export interface ScrollAreaScrollbarBaseProps extends ScrollbarProps, PolymorphicProps {}
export interface ScrollAreaScrollbarProps extends HTMLProps<'div'>, ScrollAreaScrollbarBaseProps {}

const splitScrollbarProps = createSplitProps<ScrollbarProps>()

export const ScrollAreaScrollbar = forwardRef<HTMLDivElement, ScrollAreaScrollbarProps>((props, ref) => {
  const [scrollbarProps, localProps] = splitScrollbarProps(props, ['orientation'])
  const scrollAreaApi = useScrollAreaContext()
  const mergedProps = mergeProps(scrollAreaApi.getScrollbarProps(scrollbarProps), localProps)

  return (
    <ScrollAreaScrollbarProvider value={scrollbarProps}>
      <ark.div {...mergedProps} ref={ref} />
    </ScrollAreaScrollbarProvider>
  )
})

ScrollAreaScrollbar.displayName = 'ScrollAreaScrollbar'
