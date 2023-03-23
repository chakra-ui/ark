import { Children, cloneElement, type ReactElement } from 'react'
import { useSelectContext } from './select-context'

export type SelectTriggerProps = { children: ReactElement }

export const SelectTrigger = (props: SelectTriggerProps) => {
  const { triggerProps } = useSelectContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, triggerProps)
}
