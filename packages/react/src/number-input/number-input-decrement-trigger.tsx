import { Children, cloneElement, ReactElement } from 'react'
import { useNumberInputContext } from './number-input-context'

export type NumberInputDecrementTriggerProps = { children: ReactElement }

export const NumberInputDecrementTrigger = (props: NumberInputDecrementTriggerProps) => {
  const { decrementTriggerProps } = useNumberInputContext()
  const onlyChild = Children.only(props.children)

  return cloneElement(onlyChild, decrementTriggerProps)
}
