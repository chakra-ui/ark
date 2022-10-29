import { Children, cloneElement, PropsWithChildren } from 'react'
import { usePopoverContext } from './popover-context'

export type PopoverTriggerProps = PropsWithChildren

export const PopoverTrigger = (props: PopoverTriggerProps) => {
  const { children } = props
  const child = Children.only(children) as React.ReactElement & {
    ref?: React.Ref<unknown>
  }
  const { triggerProps } = usePopoverContext()
  const trigger = cloneElement(child, triggerProps)

  return <>{trigger}</>
}
