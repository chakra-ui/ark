import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipPositionerProps extends HTMLArkProps<'div'> {}

export const TooltipPositioner = forwardRef<HTMLDivElement, TooltipPositionerProps>(
  (props, ref) => {
    const tooltip = useTooltipContext()
    const mergedProps = mergeProps(tooltip.positionerProps, props)
    const presence = usePresenceContext()

    if (presence.isUnmounted) {
      return null
    }

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TooltipPositioner.displayName = 'TooltipPositioner'
