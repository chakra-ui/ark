import type { Optional } from '$lib/types'
import { type RenderStrategyProps, splitRenderStrategyProps } from '$lib/utils/render-strategy'
import * as presence from '@zag-js/presence'
import { normalizeProps, reflect, useMachine } from '@zag-js/svelte'

export interface UsePresenceProps
  extends Optional<presence.Context, 'present'>,
    RenderStrategyProps {}
export interface UsePresenceReturn extends ReturnType<typeof usePresence> {}

export const usePresence = (props: UsePresenceProps) => {
  const [renderStrategyProps, context] = $derived(splitRenderStrategyProps(props))

  const [state, send] = useMachine(
    presence.machine(context),
    reflect(() => ({ context })),
  )

  const api = $derived(presence.connect(state, send, normalizeProps))

  let wasEverPresent = $state(false)

  $effect(() => {
    if (api.present) {
      wasEverPresent = true
    }
  })

  const unmounted = $derived(
    (!api.present && !wasEverPresent && renderStrategyProps.lazyMount) ||
      (renderStrategyProps.unmountOnExit && !api.present && wasEverPresent),
  )

  const result = $derived(() => ({
    getPresenceProps: () => ({
      'data-state': props.present ? 'open' : 'closed',
      hidden: !api.present,
    }),
    present: api.present,
    setNode: api.setNode,
    unmounted,
  }))

  return result
}
