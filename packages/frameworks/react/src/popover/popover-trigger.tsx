import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { usePopoverContext } from './popover-context'

export interface PopoverTriggerProps extends HTMLArkProps<'button'> {}

export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>((props, ref) => {
  const api = usePopoverContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    {
      ...api.triggerProps,
      'aria-controls': presenceApi.isUnmounted ? undefined : api.triggerProps['aria-controls'],
    },
    props,
  )

  return <ark.button {...mergedProps} ref={ref} />
})

PopoverTrigger.displayName = 'PopoverTrigger'
