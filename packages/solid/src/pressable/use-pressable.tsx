import * as pressable from '@zag-js/pressable'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UsePressableProps = Optional<pressable.Context, 'id'>
export type UsePressableReturn = Accessor<pressable.Api<PropTypes>>

export const usePressable = (props: UsePressableProps): UsePressableReturn => {
  const getRootNode = useEnvironmentContext()

  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(pressable.machine(context), { context })

  return createMemo(() => pressable.connect(state, send, normalizeProps))
}
