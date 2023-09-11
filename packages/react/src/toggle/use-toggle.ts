import { normalizeProps, useMachine } from '@zag-js/react'
import * as toggle from '@zag-js/toggle'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UseToggleProps extends Optional<toggle.Context, 'id'> {}

export const useToggle = (props: UseToggleProps): toggle.Api => {
  const getRootNode = useEnvironmentContext()
  const context = {
    id: useId(),
    getRootNode,
    ...props,
  }
  const [state, send] = useMachine(toggle.machine(context), { context })
  return toggle.connect(state, send, normalizeProps)
}
