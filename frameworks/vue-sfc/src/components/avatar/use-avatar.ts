import * as avatar from '@zag-js/avatar'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'

export interface UseAvatarProps extends /** @vue-ignore */ avatar.Context {}
export interface UseAvatarReturn extends ComputedRef<avatar.Api<PropTypes>> {}

export const useAvatar = (props: UseAvatarProps, emits: CallableFunction): UseAvatarReturn => {
  const context = ref(props)

  const [state, send] = useMachine(
    avatar.machine({
      ...context.value,
      onStatusChange: (details) => {
        emits('statusChange', details)
      },
    }),
    { context },
  )
  return computed(() => avatar.connect(state.value, send, normalizeProps))
}
