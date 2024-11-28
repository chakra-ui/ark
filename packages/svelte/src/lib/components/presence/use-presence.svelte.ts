// import type { Optional } from '$lib/types'
// import { type RenderStrategyProps, splitRenderStrategyProps } from '$lib/utils/render-strategy'
import type * as presence from '@zag-js/presence'
// import { normalizeProps, useMachine } from '@zag-js/svelte'

import type { Optional } from '$lib/types'
import type { RenderStrategyProps } from '$lib/utils/render-strategy'

export interface UsePresenceProps
  extends Optional<presence.Context, 'present'>,
    RenderStrategyProps {}
// export interface UsePresenceReturn extends ReturnType<typeof usePresence> {}

export const usePresence = (props: UsePresenceProps) => {
  return props
  // const [renderStrategyProps, context] = splitRenderStrategyProps(props)
  // let wasEverPresent = $state(false)
  // const [state, send] = useMachine(presence.machine(context), {
  //   context,
  // })
  // const api = $derived(() => presence.connect(state, send, normalizeProps))
  // $effect(() => {
  //   const present = api().present
  //   if (present) {
  //     wasEverPresent = true
  //   }
  // })
  // const unmounted = $derived(
  //   () =>
  //     (!api().present && !wasEverPresent && renderStrategyProps.lazyMount) ||
  //     (renderStrategyProps.unmountOnExit && !api().present && wasEverPresent),
  // )
  // return () => ({
  //   present: context.present,
  //   unmounted,
  //   presenceProps:
  //     ref: api().setNode,
  //     hidden: !api().present,
  //     'data-state': context.present ? 'open' : 'closed',,
  // })
}
