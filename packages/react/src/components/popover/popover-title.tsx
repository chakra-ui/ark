'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverTitleBaseProps extends PolymorphicProps {}
export interface PopoverTitleProps extends HTMLProps<'div'>, PopoverTitleBaseProps {}

export const PopoverTitle = ({ ref, ...props }: PopoverTitleProps) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(popover.getTitleProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

PopoverTitle.displayName = 'PopoverTitle'
