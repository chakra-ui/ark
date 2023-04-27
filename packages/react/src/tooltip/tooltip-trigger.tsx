import { Children, cloneElement, type ReactElement } from 'react'
import { useTooltipContext } from './tooltip-context'

export type TooltipTriggerProps = { children: ReactElement }

export const TooltipTrigger = (props: TooltipTriggerProps) => {
  const { triggerProps } = useTooltipContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, triggerProps)
}
