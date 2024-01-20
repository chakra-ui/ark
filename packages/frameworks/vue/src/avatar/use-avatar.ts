import * as avatar from '@zag-js/avatar'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, ref, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import { useId } from '../utils'

export interface UseAvatarProps {
  /**
   * The document's text/writing direction.
   */
  dir?: avatar.Context['dir']
  /**
   * A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.
   */
  getRootNode?: avatar.Context['getRootNode']
  /**
   * The unique identifier of the machine.
   */
  id?: avatar.Context['id']
}

export interface UseAvatarReturn extends ComputedRef<avatar.Api<PropTypes>> {}

export const useAvatar = (props: any, emit: CallableFunction): UseAvatarReturn => {
  const getRootNode = useEnvironmentContext()
  const context = ref<UseAvatarProps>(props)

  const [state, send] = useMachine(
    avatar.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onLoadingStatusChange: (details) => {
        emit('loadingStatusChange', details)
      },
    }),
    { context },
  )
  return computed(() => avatar.connect(state.value, send, normalizeProps))
}
