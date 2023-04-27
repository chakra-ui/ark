import { children, createEffect, type JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { ssrSpread } from '../ssr-spread'
import { useNumberInputContext } from './number-input-context'

export type NumberInputDecrementTriggerProps = { children: JSX.Element }

export const NumberInputDecrementTrigger = (props: NumberInputDecrementTriggerProps) => {
  const numberInput = useNumberInputContext()
  const triggerProps = numberInput().decrementTriggerProps

  const getChildren = children(() => ssrSpread(props.children, triggerProps))

  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement) {
      spread(children, triggerProps)
    }
  })

  return getChildren()
}
