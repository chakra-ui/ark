import * as presence from '@zag-js/presence'
import { normalizeProps, useMachine } from '@zag-js/react'
import type { Optional } from '../types'

export interface UsePresenceProps extends Optional<presence.Context, 'present'> {}

export const usePresence = (props: UsePresenceProps) => {
  const [state, send] = useMachine(presence.machine(props), {
    context: props,
  })
  return presence.connect(state, send, normalizeProps)
}
