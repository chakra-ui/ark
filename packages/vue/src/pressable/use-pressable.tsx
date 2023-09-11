import * as pressable from '@zag-js/pressable'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, ref, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { generateEventMap, useId } from '../utils'
import { emits } from './pressable.props'

export type UsePressableProps = Optional<pressable.Context, 'id'>
export type UsePressableReturn = ComputedRef<pressable.Api<PropTypes>>

export const usePressable = (
  props: UsePressableProps,
  emit: CallableFunction,
): UsePressableReturn => {
  const getRootNode = useEnvironmentContext()
  const context = ref(props)
  const eventMap = generateEventMap(emits, emit)

  const [state, send] = useMachine(
    pressable.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      ...eventMap,
    }),
    { context },
  )
  return computed(() => pressable.connect(state.value, send, normalizeProps))
}
