import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverTitleProps extends HTMLArkProps<'div'> {}

export const PopoverTitle = forwardRef<HTMLDivElement, PopoverTitleProps>((props, ref) => {
  const context = usePopoverContext()
  const mergedProps = mergeProps(context.titleProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverTitle.displayName = 'PopoverTitle'
