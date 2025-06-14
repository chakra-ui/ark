import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import * as collapsible from '@zag-js/collapsible'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseCollapsibleProps extends Optional<Omit<collapsible.Props, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * Whether the content should be lazy mounted
   */
  lazyMount?: boolean
  /**
   * Whether the content should be unmounted when collapsed
   */
  unmountOnExit?: boolean
  /**
   * Callback fired when the animation ends
   */
  onExitComplete?: () => void
}

export interface UseCollapsibleReturn extends Accessor<collapsible.Api<PropTypes> & { isUnmounted: boolean }> {}

export const useCollapsible = (props?: MaybeFunction<UseCollapsibleProps>): UseCollapsibleReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  let wasVisible = $state(false)

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    const { lazyMount, unmountOnExit, onExitComplete, ...collapsibleProps } = resolvedProps || {}
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...collapsibleProps,
    }
  })

  const service = useMachine(collapsible.machine, () => machineProps)
  const api = $derived(collapsible.connect(service, normalizeProps))

  const resolvedProps = $derived(runIfFn(props))

  // Track if content was ever visible
  $effect(() => {
    if (api.visible) {
      wasVisible = true
    }
  })

  const isUnmounted = $derived.by(() => {
    const { lazyMount, unmountOnExit } = resolvedProps || {}
    return (!api.visible && !wasVisible && lazyMount) || (unmountOnExit && !api.visible && wasVisible)
  })

  return () => ({ ...api, isUnmounted: Boolean(isUnmounted) })
}
