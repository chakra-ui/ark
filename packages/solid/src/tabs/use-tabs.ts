import { mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import * as tabs from '@zag-js/tabs'
import { createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseTabsProps = Optional<tabs.Context, 'id'>
export type UseTabsReturn = ReturnType<typeof useTabs>

export const useTabs = (props: UseTabsProps) => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(tabs.machine(context), { context })

  return createMemo(() => tabs.connect(state, send, normalizeProps))
}
