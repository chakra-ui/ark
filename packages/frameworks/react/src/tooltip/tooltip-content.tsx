import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipContentProps extends HTMLArkProps<'div'> {}

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>((props, ref) => {
  const context = useTooltipContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(context.contentProps, presenceApi.getPresenceProps(ref), props)

  if (presenceApi.isUnmounted) {
    return null
  }

  return <ark.div {...mergedProps} />
})

TooltipContent.displayName = 'TooltipContent'
