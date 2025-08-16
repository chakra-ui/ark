import type { Accessor, Optional } from '$lib/types.js'
import * as scrollArea from '@zag-js/scroll-area'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

export interface UseScrollAreaProps extends Optional<Omit<scrollArea.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseScrollAreaReturn extends Accessor<scrollArea.Api<PropTypes>> {}

export const useScrollArea = (props: MaybeFunction<UseScrollAreaProps> = {}): UseScrollAreaReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(scrollArea.machine, () => machineProps)
  const api = $derived(scrollArea.connect(service, normalizeProps))

  return () => api
}
