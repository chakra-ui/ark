import * as presence from '@zag-js/presence'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, ref } from 'vue'
import type { Optional } from '../types'

export type UsePresenceProps = Optional<presence.Context, 'present'>

export const usePresence = (props: UsePresenceProps) => {
  const context = ref(props)

  const [state, send] = useMachine(presence.machine(props), { context })
  return computed(() => presence.connect(state.value, send, normalizeProps))
}
