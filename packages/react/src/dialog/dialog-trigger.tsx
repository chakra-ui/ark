import { Children, cloneElement, type ReactElement } from 'react'
import { useDialogContext } from './dialog-context'

export type DialogTriggerProps = { children: ReactElement }

export const DialogTrigger = (props: DialogTriggerProps) => {
  const { triggerProps } = useDialogContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, triggerProps)
}
