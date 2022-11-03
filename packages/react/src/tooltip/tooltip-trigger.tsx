import { cloneElement, ReactElement } from 'react'
import { atlas } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipTriggerProps = { children: ReactElement | string | number }

export const TooltipTrigger = (props: TooltipTriggerProps) => {
  const { children } = props
  const { triggerProps } = useTooltipContext()

  return typeof children === 'string' || typeof children === 'number' ? (
    <atlas.span {...triggerProps}>{children}</atlas.span>
  ) : (
    cloneElement(children, triggerProps)
  )
}
