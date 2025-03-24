import * as presence from '@zag-js/presence'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createEffect, createMemo, createSignal } from 'solid-js'
import type { MaybeAccessor, Optional } from '../../types'
import { type RenderStrategyProps, splitRenderStrategyProps } from '../../utils/render-strategy'
import { runIfFn } from '../../utils/run-if-fn'

export interface UsePresenceProps extends Optional<presence.Props, 'present'>, RenderStrategyProps {
  /**
   * Whether to allow the initial presence animation.
   * @default true
   */
  initial?: boolean
}
export interface UsePresenceReturn extends ReturnType<typeof usePresence> {}

export const usePresence = (props: MaybeAccessor<UsePresenceProps>) => {
  const [renderStrategyProps, localProps] = splitRenderStrategyProps(runIfFn(props))
  const [wasEverPresent, setWasEverPresent] = createSignal(false)

  const service = useMachine(presence.machine, props)
  const api = createMemo(() => presence.connect(service, normalizeProps))

  createEffect(() => {
    const present = api().present
    if (present) setWasEverPresent(true)
  })

  const initial = createMemo(() => localProps.initial ?? true)

  return createMemo(() => ({
    unmounted:
      (!api().present && !wasEverPresent() && renderStrategyProps.lazyMount) ||
      (renderStrategyProps.unmountOnExit && !api().present && wasEverPresent()),
    present: api().present,
    ref: api().setNode,
    presenceProps: {
      hidden: !api().present,
      'data-state': api().skip && !initial() ? undefined : localProps.present ? 'open' : 'closed',
    },
  }))
}
