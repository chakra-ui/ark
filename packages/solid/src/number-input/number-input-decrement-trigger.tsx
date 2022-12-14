import { children, createEffect, JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { useNumberInputContext } from './number-input-context'

export type NumberInputDecrementTriggerProps = { children: JSX.Element }

export const NumberInputDecrementTrigger = (props: NumberInputDecrementTriggerProps) => {
  const numberInput = useNumberInputContext()
  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, numberInput().decrementTriggerProps)
    }
  })

  return <>{getChildren()}</>
}
