import { cloneElement, ReactElement } from 'react'
import { atlas } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogTriggerProps = { children: ReactElement | string | number }

export const DialogTrigger = (props: DialogTriggerProps) => {
  const { children } = props
  const { triggerProps } = useDialogContext()

  return typeof children === 'string' || typeof children === 'number' ? (
    <atlas.span {...triggerProps}>{children}</atlas.span>
  ) : (
    cloneElement(children, triggerProps)
  )
}
