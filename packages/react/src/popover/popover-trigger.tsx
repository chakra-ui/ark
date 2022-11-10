import { Children, cloneElement, ReactElement } from 'react'
import { usePopoverContext } from './popover-context'

export type PopoverTriggerProps = { children: ReactElement }

export const PopoverTrigger = (props: PopoverTriggerProps) => {
  const { triggerProps } = usePopoverContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, triggerProps)
}
