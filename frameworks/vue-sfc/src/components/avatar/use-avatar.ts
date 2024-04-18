import * as avatar from '@zag-js/avatar'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'
import { useId } from '../../utils'

export interface UseAvatarProps extends /** @vue-ignore */ Optional<avatar.Context, 'id'> {}
export interface UseAvatarReturn extends ComputedRef<avatar.Api<PropTypes>> {}

export const useAvatar = (props: UseAvatarProps, emits: CallableFunction): UseAvatarReturn => {
  const context = ref(props)
  const environment = useEnvironmentContext()

  const [state, send] = useMachine(
    avatar.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode: environment?.value,
      onStatusChange: (details) => {
        emits('statusChange', details)
      },
    }),
    { context },
  )
  return computed(() => avatar.connect(state.value, send, normalizeProps))
}
