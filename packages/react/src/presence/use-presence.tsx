import * as presence from '@zag-js/presence'
import { normalizeProps, useMachine } from '@zag-js/react'

export type UsePresenceProps = presence.Context

export const usePresence = (props: UsePresenceProps) => {
  const [state, send] = useMachine(presence.machine(props), {
    context: props,
  })
  return presence.connect(state, send, normalizeProps)
}
