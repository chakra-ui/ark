import * as pressable from '@zag-js/pressable'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UsePressableProps extends Optional<pressable.Context, 'id'> {}
export type UsePressableReturn = pressable.Api

export const usePressable = (props?: UsePressableProps): UsePressableReturn => {
  const getRootNode = useEnvironmentContext()
  const context = {
    id: useId(),
    getRootNode,
    ...props,
  }
  const [state, send] = useMachine(pressable.machine(context), { context })
  return pressable.connect(state, send, normalizeProps)
}
