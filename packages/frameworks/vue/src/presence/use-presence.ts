import * as presence from '@zag-js/presence'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, ref } from 'vue'
import type { Optional } from '../types'
import { generateEventMap } from '../utils'
import { emits } from './presence.props'

export interface UsePresenceProps extends Optional<presence.Context, 'present'> {
  /**
   * Whether to enable lazy mounting
   * @default false
   */
  lazyMount?: boolean
  /**
   * Whether to unmount on exit.
   * @default false
   */
  unmountOnExit?: boolean
}

export type UsePresenceReturn = ReturnType<typeof usePresence>

export const usePresence = (props: UsePresenceProps, emit: CallableFunction) => {
  const context = ref(props)
  const eventMap = generateEventMap(emits, emit)

  const [state, send] = useMachine(presence.machine({ ...context.value, ...eventMap }), { context })
  return computed(() => presence.connect(state.value, send, normalizeProps))
}
