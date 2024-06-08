import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipPositionerProps extends HTMLArkProps<'div'> {}

export const TooltipPositioner = forwardRef<HTMLDivElement, TooltipPositionerProps>(
  (props, ref) => {
    const tooltip = useTooltipContext()
    const mergedProps = mergeProps(tooltip.getPositionerProps(), props)
    const presence = usePresenceContext()

    if (presence.unmounted) {
      return null
    }

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TooltipPositioner.displayName = 'TooltipPositioner'
