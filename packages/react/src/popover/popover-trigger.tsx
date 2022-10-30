import { cloneElement, ReactElement } from 'react'
import { atlas } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverTriggerProps = { children: ReactElement | string | number }

export const PopoverTrigger = (props: PopoverTriggerProps) => {
  const { children } = props
  const { triggerProps } = usePopoverContext()

  return typeof children === 'string' || typeof children === 'number'
    ? cloneElement(<atlas.span>{children}</atlas.span>, triggerProps)
    : cloneElement(children, triggerProps)
}
