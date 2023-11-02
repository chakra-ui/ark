import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { usePopoverContext } from './popover-context'

export interface PopoverContentProps extends HTMLArkProps<'div'> {}

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>((props, ref) => {
  const api = usePopoverContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(api.contentProps, props)

  if (presenceApi.isUnmounted) {
    return null
  }

  return <div {...mergedProps} {...presenceApi.getPresenceProps(ref)} />
})

PopoverContent.displayName = 'PopoverContent'
