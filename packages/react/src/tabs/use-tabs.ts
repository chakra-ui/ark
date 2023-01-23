import { normalizeProps, useMachine } from '@zag-js/react'
import { connect, Context, machine } from '@zag-js/tabs'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'

export type UseTabsProps = Optional<Context, 'id'> & {
  defaultValue?: Context['value']
}
export type UseTabsReturn = ReturnType<typeof useTabs>

export const useTabs = (props: UseTabsProps) => {
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
  const [state, send] = useMachine(machine(initialContext), { context })

  return connect(state, send, normalizeProps)
}
