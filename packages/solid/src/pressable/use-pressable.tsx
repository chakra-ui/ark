import * as pressable from '@zag-js/pressable'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createUniqueId } from 'solid-js'
import type { Optional } from '../types'

export type UsePressableProps = Optional<pressable.Context, 'id'>
export type UsePressableReturn = ReturnType<typeof usePressable>

export const usePressable = (props: UsePressableProps) => {
  const context = {
    id: createUniqueId(),
    ...props,
  }
  const [state, send] = useMachine(pressable.machine(context), { context })
  return pressable.connect(state, send, normalizeProps)
}
