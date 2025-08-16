import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useScrollAreaContext } from './use-scroll-area-context'

export interface ScrollAreaViewportBaseProps extends PolymorphicProps {}
export interface ScrollAreaViewportProps extends HTMLProps<'div'>, ScrollAreaViewportBaseProps {}

export const ScrollAreaViewport = forwardRef<HTMLDivElement, ScrollAreaViewportProps>((props, ref) => {
  const scrollArea = useScrollAreaContext()
  const mergedProps = mergeProps(scrollArea.getViewportProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ScrollAreaViewport.displayName = 'ScrollAreaViewport'
