import { Children, cloneElement, ReactElement } from 'react'
import { useNumberInputContext } from './number-input-context'

export type NumberInputIncrementTriggerProps = { children: ReactElement }

export const NumberInputIncrementTrigger = (props: NumberInputIncrementTriggerProps) => {
  const { incrementTriggerProps } = useNumberInputContext()
  const onlyChild = Children.only(props.children)

  return cloneElement(onlyChild, incrementTriggerProps)
}
