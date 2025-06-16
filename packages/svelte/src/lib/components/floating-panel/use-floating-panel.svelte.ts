import type { Accessor, Optional } from '$lib/types.js'
import * as floatingPanel from '@zag-js/floating-panel'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

export interface UseFloatingPanelProps extends Optional<Omit<floatingPanel.Props, 'getRootNode'>, 'id'> {}
export interface UseFloatingPanelReturn extends Accessor<floatingPanel.Api<PropTypes>> {}

export const useFloatingPanel = (props: MaybeFunction<UseFloatingPanelProps> = {}): UseFloatingPanelReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const resolvedProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(floatingPanel.machine, () => resolvedProps)
  const api = $derived(floatingPanel.connect(service, normalizeProps))
  return () => api
}
