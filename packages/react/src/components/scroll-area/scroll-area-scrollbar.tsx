import { mergeProps } from '@zag-js/react'
import type { Orientation } from '@zag-js/types'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useScrollAreaContext } from './use-scroll-area-context'

interface ScrollbarProps {
  orientation?: Orientation
}

export interface ScrollAreaScrollbarBaseProps extends ScrollbarProps, PolymorphicProps {}
export interface ScrollAreaScrollbarProps extends HTMLProps<'div'>, ScrollAreaScrollbarBaseProps {}

export const ScrollAreaScrollbar = forwardRef<HTMLDivElement, ScrollAreaScrollbarProps>((props, ref) => {
  const [scrollbarProps, localProps] = createSplitProps<ScrollbarProps>()(props, ['orientation'])
  const scrollAreaApi = useScrollAreaContext()
  const mergedProps = mergeProps(scrollAreaApi.getScrollbarProps(scrollbarProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

ScrollAreaScrollbar.displayName = 'ScrollAreaScrollbar'
