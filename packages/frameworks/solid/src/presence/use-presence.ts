import * as presence from '@zag-js/presence'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import type { Optional } from '../types'

export type UsePresenceProps = Optional<presence.Context, 'present'>

export const usePresence = (props: UsePresenceProps) => {
  const [state, send] = useMachine(presence.machine(props), {
    context: props,
  })
  return createMemo(() => presence.connect(state, send, normalizeProps))
}
