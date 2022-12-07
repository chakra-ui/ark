import { children, createEffect, JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { useNumberInputContext } from './number-input-context'

export type NumberInputIncrementTriggerProps = { children: JSX.Element }

export const NumberInputIncrementTrigger = (props: NumberInputIncrementTriggerProps) => {
  const numberInput = useNumberInputContext()
  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, numberInput().incrementButtonProps)
    }
  })

  return <>{getChildren()}</>
}
