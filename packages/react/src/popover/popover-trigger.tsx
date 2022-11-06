import { cloneElement, ReactElement } from 'react'
import { ark } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverTriggerProps = { children: ReactElement | string | number }

export const PopoverTrigger = (props: PopoverTriggerProps) => {
  const { children } = props
  const { triggerProps } = usePopoverContext()

  return typeof children === 'string' || typeof children === 'number' ? (
    <ark.span {...triggerProps}>{children}</ark.span>
  ) : (
    cloneElement(children, triggerProps)
  )
}
