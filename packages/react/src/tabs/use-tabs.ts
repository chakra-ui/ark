import { normalizeProps, useMachine } from '@zag-js/react'
import * as tabs from '@zag-js/tabs'
import { useId } from 'react'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UseTabsProps = Omit<tabs.Context, 'id'>
export type UseTabsReturn = ReturnType<typeof useTabs>

export const useTabs = (props: UseTabsProps) => {
  const [state, send] = useMachine(tabs.machine({ id: useId(), ...filterUndefinedEntries(props) }))
  return tabs.connect(state, send, normalizeProps)
}
