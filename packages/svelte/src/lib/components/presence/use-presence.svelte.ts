import type { Optional } from '$lib/types'
import { type RenderStrategyProps, splitRenderStrategyProps } from '$lib/utils/render-strategy'
import * as presence from '@zag-js/presence'
import { normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UsePresenceProps extends Optional<presence.Props, 'present'>, RenderStrategyProps {
  /**
   * Whether to allow the initial presence animation.
   * @default false
   */
  skipAnimationOnMount?: boolean
}
export interface UsePresenceReturn extends ReturnType<typeof usePresence> {}

export const usePresence = (props: MaybeFunction<UsePresenceProps>) => {
  const resolvedProps = $derived(runIfFn(props))
  const [renderStrategyProps, machineProps] = $derived(splitRenderStrategyProps(resolvedProps))

  const service = useMachine(presence.machine, () => machineProps)
  const api = $derived(presence.connect(service, normalizeProps))

  let wasEverPresent = $state(false)

  $effect(() => {
    if (api.present) {
      wasEverPresent = true
    }
  })

  const setNode = (node: Element | null) => {
    if (!node) return
    service.send({ type: 'NODE.SET', node })
  }

  const unmounted = $derived(
    (!api.present && !wasEverPresent && renderStrategyProps.lazyMount) ||
      (renderStrategyProps.unmountOnExit && !api.present && wasEverPresent),
  )

  const result = $derived({
    getPresenceProps: () => ({
      'data-state':
        api.skip && resolvedProps.skipAnimationOnMount ? undefined : resolvedProps.present ? 'open' : 'closed',
      hidden: !api.present,
    }),
    present: api.present,
    setNode,
    unmounted,
  })

  return () => result
}
