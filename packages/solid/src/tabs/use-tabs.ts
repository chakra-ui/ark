import { normalizeProps, useMachine } from '@zag-js/solid'
import * as tabs from '@zag-js/tabs'
import { createMemo, createUniqueId } from 'solid-js'
import type { Optional } from '../types'

export type UseTabsProps = Optional<tabs.Context, 'id'> & {
  defaultValue?: tabs.Context['value']
}
export type UseTabsReturn = ReturnType<typeof useTabs>

export const useTabs = (props: UseTabsProps) => {
  console.log('useTabs', props.value)
  const initialContext = {
    id: createUniqueId(),
    ...props,
    value: props.defaultValue,
  }
  const context = {
    ...initialContext,
    value: props.value,
  }

  const [state, send] = useMachine(tabs.machine(initialContext), { context })

  return createMemo(() => tabs.connect(state, send, normalizeProps))
}
