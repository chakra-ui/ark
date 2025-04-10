import type { Optional } from '$lib/types'
import { type RenderStrategyProps, splitRenderStrategyProps } from '$lib/utils/render-strategy'
import * as presence from '@zag-js/presence'
import { normalizeProps, useMachine } from '@zag-js/svelte'

export interface UsePresenceProps extends Optional<presence.Props, 'present'>, RenderStrategyProps {
  /**
   * Whether to allow the initial presence animation.
   * @default false
   */
  skipAnimationOnMount?: boolean
}
export interface UsePresenceReturn extends ReturnType<typeof usePresence> {}

export const usePresence = (props: UsePresenceProps) => {
  const [renderStrategyProps, machineProps] = $derived(splitRenderStrategyProps(props))

  const service = useMachine(presence.machine, () => machineProps)

  const api = $derived(presence.connect(service, normalizeProps))

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
      'data-state': api.skip && props.skipAnimationOnMount ? undefined : props.present ? 'open' : 'closed',
      hidden: !api.present,
    }),
    present: api.present,
    setNode: api.setNode,
    unmounted,
  }))

  return result
}
