import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { usePopoverContext } from './use-popover-context'

export interface PopoverTriggerProps extends HTMLArkProps<'button'> {}

export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>((props, ref) => {
  const context = usePopoverContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    {
      ...context.triggerProps,
      'aria-controls': presenceApi.isUnmounted ? undefined : context.triggerProps['aria-controls'],
    },
    props,
  )

  return <ark.button {...mergedProps} ref={ref} />
})

PopoverTrigger.displayName = 'PopoverTrigger'
