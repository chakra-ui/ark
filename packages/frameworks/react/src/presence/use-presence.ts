import * as presence from '@zag-js/presence'
import { normalizeProps, useMachine } from '@zag-js/react'
import type { Optional } from '../types'
import { useEvent } from '../use-event'

export interface UsePresenceProps extends Optional<presence.Context, 'present'> {}

export const usePresence = (props: UsePresenceProps) => {
  const context: Partial<presence.Context> = {
    ...props,
    onExitComplete: useEvent(props.onExitComplete),
  }

  const [state, send] = useMachine(presence.machine(context), { context })

  return presence.connect(state, send, normalizeProps)
}
