import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipPositionerBaseProps extends PolymorphicProps {}
export interface TooltipPositionerProps extends HTMLProps<'div'>, TooltipPositionerBaseProps {}

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
