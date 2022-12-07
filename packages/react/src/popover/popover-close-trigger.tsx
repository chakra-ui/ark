import { Children, cloneElement, ReactElement } from 'react'
import { usePopoverContext } from './popover-context'

export type PopoverCloseTriggerProps = { children: ReactElement }

export const PopoverCloseTrigger = (props: PopoverCloseTriggerProps) => {
  const { closeButtonProps } = usePopoverContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, closeButtonProps)
}
