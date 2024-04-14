import * as presence from '@zag-js/presence'
import { normalizeProps, useMachine } from '@zag-js/react'
import { type ForwardedRef, useRef } from 'react'
import type { Optional } from '../../types'
import { composeRefs } from '../../utils/compose-refs'
import type { RenderStrategyProps } from '../../utils/render-strategy'
import { useEvent } from '../../utils/use-event'

export interface UsePresenceProps
  extends Optional<presence.Context, 'present'>,
    RenderStrategyProps {}
export type UsePresenceReturn = ReturnType<typeof usePresence>

export const usePresence = (props: UsePresenceProps) => {
  const { lazyMount, unmountOnExit, ...rest } = props
  const wasEverPresent = useRef(false)
  const context: Partial<presence.Context> = {
    ...rest,
    onExitComplete: useEvent(props.onExitComplete),
  }

  const [state, send] = useMachine(presence.machine(context), { context })
  const api = presence.connect(state, send, normalizeProps)

  if (api.isPresent) {
    wasEverPresent.current = true
  }

  const isUnmounted =
    (!api.isPresent && !wasEverPresent.current && lazyMount) ||
    (unmountOnExit && !api.isPresent && wasEverPresent.current)

  const getPresenceProps = <T extends HTMLElement>(ref: ForwardedRef<T>) => ({
    ref: composeRefs(api.setNode, ref) as ForwardedRef<T>,
    'data-state': props.present ? 'open' : 'closed',
    hidden: !api.isPresent,
  })

  return {
    getPresenceProps,
    isPresent: api.isPresent,
    isUnmounted,
  }
}
