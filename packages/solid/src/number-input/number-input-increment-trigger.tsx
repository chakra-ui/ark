import { children, createEffect, type JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { ssrSpread } from '../ssr-spread'
import { useNumberInputContext } from './number-input-context'

export type NumberInputIncrementTriggerProps = { children: JSX.Element }

export const NumberInputIncrementTrigger = (props: NumberInputIncrementTriggerProps) => {
  const numberInput = useNumberInputContext()
  const triggerProps = numberInput().incrementTriggerProps

  const getChildren = children(() => ssrSpread(props.children, triggerProps))

  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement) {
      spread(children, triggerProps)
    }
  })

  return getChildren()
}
