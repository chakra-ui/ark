import { cloneElement, ReactElement } from 'react'
import { atlas } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverTriggerProps = { children: ReactElement | string | number }

export const PopoverTrigger = (props: PopoverTriggerProps) => {
  const { children } = props
  const { triggerProps } = usePopoverContext()

  return typeof children === 'string' || typeof children === 'number' ? (
    <atlas.span {...triggerProps}>{children}</atlas.span>
  ) : (
    cloneElement(children, triggerProps)
  )
}
