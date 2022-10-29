import { Children, cloneElement, PropsWithChildren } from 'react'
import { useTooltipContext } from './tooltip-context'

export type TooltipTriggerProps = PropsWithChildren

export const TooltipTrigger = (props: TooltipTriggerProps) => {
  const { children } = props
  const child = Children.only(children) as React.ReactElement & {
    ref?: React.Ref<unknown>
  }
  const { triggerProps } = useTooltipContext()
  const trigger = cloneElement(child, triggerProps)

  return <>{trigger}</>
}
