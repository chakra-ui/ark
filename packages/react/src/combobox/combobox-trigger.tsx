import { Children, cloneElement, ReactElement } from 'react'
import { useComboboxContext } from './combobox-context'

export type ComboboxTriggerProps = { children: ReactElement }

export const ComboboxTrigger = (props: ComboboxTriggerProps) => {
  const { triggerProps } = useComboboxContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, triggerProps)
}
