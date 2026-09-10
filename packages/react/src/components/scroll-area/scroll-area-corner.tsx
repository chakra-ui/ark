'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useScrollAreaContext } from './use-scroll-area-context.ts'
import type { CornerState } from '@zag-js/scroll-area'

export interface ScrollAreaCornerState extends CornerState {}

export interface ScrollAreaCornerBaseProps extends PolymorphicProps<ScrollAreaCornerState> {}
export interface ScrollAreaCornerProps extends HTMLProps<'div'>, ScrollAreaCornerBaseProps {}

export const ScrollAreaCorner = forwardRef<HTMLDivElement, ScrollAreaCornerProps>((props, ref) => {
  const scrollArea = useScrollAreaContext()
  const mergedProps = mergeProps(scrollArea.getCornerProps(), props)

  return <ark.div {...mergedProps} ref={ref} state={scrollArea.getCornerState()} />
})

ScrollAreaCorner.displayName = 'ScrollAreaCorner'
