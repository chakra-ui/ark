import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export interface PopoverTitleProps extends HTMLArkProps<'div'> {}

export const PopoverTitle = forwardRef<HTMLDivElement, PopoverTitleProps>((props, ref) => {
  const api = usePopoverContext()
  const mergedProps = mergeProps(api.titleProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverTitle.displayName = 'PopoverTitle'
