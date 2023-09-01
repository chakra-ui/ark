import * as avatar from '@zag-js/avatar'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, ref, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { generateEventMap, useId } from '../utils'
import { emits } from './avatar.props'

export type UseAvatarProps = Optional<avatar.Context, 'id'>
export type UseAvatarReturn = ComputedRef<avatar.Api<PropTypes>>

export const useAvatar = (props: UseAvatarProps, emit: CallableFunction): UseAvatarReturn => {
  const getRootNode = useEnvironmentContext()
  const context = ref(props)
  const eventMap = generateEventMap(emits, emit)

  const [state, send] = useMachine(
    avatar.machine({
      id: useId().value,
      getRootNode,
      ...eventMap,
      ...context.value,
    }),
    { context },
  )
  return computed(() => avatar.connect(state.value, send, normalizeProps))
}
