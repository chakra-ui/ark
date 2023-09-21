import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export interface TooltipPositionerProps extends HTMLArkProps<'div'> {}

export const TooltipPositioner = forwardRef<HTMLDivElement, TooltipPositionerProps>(
  (props, ref) => {
    const api = useTooltipContext()
    const mergedProps = mergeProps(api.positionerProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TooltipPositioner.displayName = 'TooltipPositioner'
