import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { usePopoverContext } from './use-popover-context'

export interface PopoverContentProps extends HTMLArkProps<'div'> {}

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>((props, ref) => {
  const context = usePopoverContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(context.contentProps, presenceApi.getPresenceProps(ref), props)

  if (presenceApi.isUnmounted) {
    return null
  }

  return <ark.div {...mergedProps} />
})

PopoverContent.displayName = 'PopoverContent'
