import { normalizeProps, useMachine } from '@zag-js/react'
import * as tabs from '@zag-js/tabs'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UseTabsProps extends Optional<tabs.Context, 'id'> {
  defaultValue?: tabs.Context['value']
}
export type UseTabsReturn = tabs.Api

export const useTabs = (props: UseTabsProps): UseTabsReturn => {
  const getRootNode = useEnvironmentContext()
  const initialContext = {
    id: useId(),
    getRootNode,
    ...props,
    value: props.defaultValue,
  }
  const context = {
    ...initialContext,
    value: props.value,
  }
  const [state, send] = useMachine(tabs.machine(initialContext), { context })

  return tabs.connect(state, send, normalizeProps)
}
