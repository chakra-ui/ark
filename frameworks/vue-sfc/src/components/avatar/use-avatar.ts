import * as avatar from '@zag-js/avatar'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'

/**
 * Type to make properties optional and preserve their type
 */
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export interface UseAvatarProps extends avatar.Context {}
export interface UseAvatarReturn extends ComputedRef<avatar.Api<PropTypes>> {}

export const useAvatar = (props: UseAvatarProps, emit: CallableFunction): UseAvatarReturn => {
  const context = ref(props)

  const [state, send] = useMachine(
    avatar.machine({
      ...context.value,
    }),
    { context },
  )
  return computed(() => avatar.connect(state.value, send, normalizeProps))
}
