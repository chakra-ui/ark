'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { usePopoverContext } from './use-popover-context.ts'

export interface PopoverIndicatorBaseProps extends PolymorphicProps {}
export interface PopoverIndicatorProps extends HTMLProps<'span'>, PopoverIndicatorBaseProps {}

export const PopoverIndicator = forwardRef<HTMLSpanElement, PopoverIndicatorProps>((props, ref) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(popover.getIndicatorProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

PopoverIndicator.displayName = 'PopoverIndicator'
