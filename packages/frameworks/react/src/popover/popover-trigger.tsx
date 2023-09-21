import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export interface PopoverTriggerProps extends HTMLArkProps<'button'> {}

export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>((props, ref) => {
  const api = usePopoverContext()
  const mergedProps = mergeProps(api.triggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

PopoverTrigger.displayName = 'PopoverTrigger'
