import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipContentProps extends HTMLArkProps<'div'> {}

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>((props, ref) => {
  const tooltip = useTooltipContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(tooltip.contentProps, presence.getPresenceProps(ref), props)

  if (presence.isUnmounted) {
    return null
  }

  return <ark.div {...mergedProps} />
})

TooltipContent.displayName = 'TooltipContent'
