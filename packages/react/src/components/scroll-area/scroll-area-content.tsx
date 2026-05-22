'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useScrollAreaContext } from './use-scroll-area-context'

export interface ScrollAreaContentBaseProps extends PolymorphicProps {}
export interface ScrollAreaContentProps extends HTMLProps<'div'>, ScrollAreaContentBaseProps {}

export const ScrollAreaContent = ({ ref, ...props }: ScrollAreaContentProps) => {
  const scrollArea = useScrollAreaContext()
  const mergedProps = mergeProps(scrollArea.getContentProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

ScrollAreaContent.displayName = 'ScrollAreaContent'
