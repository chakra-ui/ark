import { normalizeProps, useMachine } from '@zag-js/react'
import * as toggle from '@zag-js/toggle'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseToggleProps = Optional<toggle.Context, 'id'>
export type UseToggleReturn = toggle.Api

export const useToggle = (props: UseToggleProps): UseToggleReturn => {
  const getRootNode = useEnvironmentContext()
  const context = {
    id: useId(),
    getRootNode,
    ...props,
  }
  const [state, send] = useMachine(toggle.machine(context), { context })
  return toggle.connect(state, send, normalizeProps)
}
