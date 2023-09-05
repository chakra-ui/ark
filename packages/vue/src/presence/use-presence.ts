import * as presence from '@zag-js/presence'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, ref } from 'vue'
import type { Optional } from '../types'
import { generateEventMap } from '../utils'
import { emits } from './presence.props'

export type UsePresenceProps = Optional<presence.Context, 'present'>

export const usePresence = (props: UsePresenceProps, emit: CallableFunction) => {
  const context = ref(props)
  const eventMap = generateEventMap(emits, emit)

  const [state, send] = useMachine(presence.machine({ ...context.value, ...eventMap }), { context })
  return computed(() => presence.connect(state.value, send, normalizeProps))
}
