import * as avatar from '@zag-js/avatar'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, ref, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseAvatarProps = Optional<avatar.Context, 'id'>
export type UseAvatarReturn = ComputedRef<avatar.Api<PropTypes>>

export const useAvatar = (props: UseAvatarProps, emit: CallableFunction): UseAvatarReturn => {
  const getRootNode = useEnvironmentContext()
  const context = ref(props)

  const [state, send] = useMachine(
    avatar.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onLoadingStatusChange: (loadingStatus) => {
        emit('loading-status-change', loadingStatus)
      },
    }),
    { context },
  )
  return computed(() => avatar.connect(state.value, send, normalizeProps))
}
