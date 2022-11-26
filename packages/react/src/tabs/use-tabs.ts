import { normalizeProps, useMachine } from '@zag-js/react'
import * as tabs from '@zag-js/tabs'
import { useId } from 'react'
import type { Optional } from '../types'

export type UseTabsProps = Optional<tabs.Context, 'id'> & {
  defaultValue?: tabs.Context['value']
}
export type UseTabsReturn = ReturnType<typeof useTabs>

export const useTabs = (props: UseTabsProps) => {
  const initialContext = { id: useId(), ...props, value: props.defaultValue }
  const context = {
    ...initialContext,
    value: props.value,
  }
  const [state, send] = useMachine(tabs.machine(initialContext), { context })

  return tabs.connect(state, send, normalizeProps)
}
