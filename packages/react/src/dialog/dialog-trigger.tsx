import { cloneElement, ReactElement } from 'react'
import { ark } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogTriggerProps = { children: ReactElement | string | number }

export const DialogTrigger = (props: DialogTriggerProps) => {
  const { children } = props
  const { triggerProps } = useDialogContext()

  return typeof children === 'string' || typeof children === 'number' ? (
    <ark.span {...triggerProps}>{children}</ark.span>
  ) : (
    cloneElement(children, triggerProps)
  )
}
