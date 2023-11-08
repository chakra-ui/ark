import * as presence from '@zag-js/presence'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createEffect, createMemo, createSignal, splitProps } from 'solid-js'
import type { Optional } from '../types'

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

export interface UsePresenceReturn extends ReturnType<typeof usePresence> {}

export const usePresence = (props: UsePresenceProps) => {
  const [localProps, machineProps] = splitProps(props, ['lazyMount', 'unmountOnExit'])
  const [wasEverPresent, setWasEverPresent] = createSignal(false)
  const [state, send] = useMachine(presence.machine(machineProps), {
    context: machineProps,
  })
  const api = createMemo(() => presence.connect(state, send, normalizeProps))

  createEffect(() => {
    const isPresent = api().isPresent
    if (isPresent) setWasEverPresent(true)
  })

  return createMemo(() => ({
    isUnmounted:
      (!api().isPresent && !wasEverPresent() && localProps.lazyMount) ||
      (localProps.unmountOnExit && !api().isPresent && wasEverPresent()),
    isPresent: api().isPresent,
    presenceProps: {
      ref: api().setNode,
      hidden: !api().isPresent,
      'data-state': machineProps.present ? 'open' : 'closed',
    },
  }))
}
