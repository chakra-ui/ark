import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverTitleProps extends HTMLArkProps<'div'> {}

export const PopoverTitle = forwardRef<HTMLDivElement, PopoverTitleProps>((props, ref) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(popover.titleProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverTitle.displayName = 'PopoverTitle'
