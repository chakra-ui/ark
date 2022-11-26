import { normalizeProps, useMachine } from '@zag-js/react'
import * as tabs from '@zag-js/tabs'
import { useId } from 'react'
import type { Optional } from '../types'

export type UseTabsProps = Optional<tabs.Context, 'id'>
export type UseTabsReturn = ReturnType<typeof useTabs>

export const useTabs = (props: UseTabsProps) => {
  const context = { id: useId(), ...props }
  const [state, send] = useMachine(tabs.machine(context), { context })

  return tabs.connect(state, send, normalizeProps)
}
