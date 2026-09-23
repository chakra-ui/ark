'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { usePopoverContext } from './use-popover-context.ts'

export interface PopoverTitleBaseProps extends PolymorphicProps {}
export interface PopoverTitleProps extends HTMLProps<'h2'>, PopoverTitleBaseProps {}

export const PopoverTitle = forwardRef<HTMLHeadingElement, PopoverTitleProps>((props, ref) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(popover.getTitleProps(), props)

  return <ark.h2 {...mergedProps} ref={ref} />
})

PopoverTitle.displayName = 'PopoverTitle'
