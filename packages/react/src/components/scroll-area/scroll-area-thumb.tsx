import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useScrollAreaContext } from './use-scroll-area-context'
import { useScrollAreaScrollbarContext } from './use-scroll-area-scrollbar-context'

export interface ScrollAreaThumbBaseProps extends PolymorphicProps {}
export interface ScrollAreaThumbProps extends HTMLProps<'div'>, ScrollAreaThumbBaseProps {}

export const ScrollAreaThumb = forwardRef<HTMLDivElement, ScrollAreaThumbProps>((props, ref) => {
  const scrollAreaApi = useScrollAreaContext()
  const scrollbarProps = useScrollAreaScrollbarContext()

  const mergedProps = mergeProps(scrollAreaApi.getThumbProps(scrollbarProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ScrollAreaThumb.displayName = 'ScrollAreaThumb'
