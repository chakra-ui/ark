import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export type PopoverIndicatorBaseProps = {}
export interface PopoverIndicatorProps extends HTMLArkProps<'div'>, PopoverIndicatorBaseProps {}

export const PopoverIndicator = forwardRef<HTMLDivElement, PopoverIndicatorProps>((props, ref) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(popover.getIndicatorProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverIndicator.displayName = 'PopoverIndicator'
