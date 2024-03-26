import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverArrowProps extends HTMLArkProps<'div'> {}

export const PopoverArrow = forwardRef<HTMLDivElement, PopoverArrowProps>((props, ref) => {
  const context = usePopoverContext()
  const mergedProps = mergeProps(context.arrowProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverArrow.displayName = 'PopoverArrow'
