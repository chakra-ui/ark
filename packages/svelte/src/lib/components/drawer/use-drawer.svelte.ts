import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import * as drawer from '@zag-js/drawer'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { useDrawerStackStore } from './use-drawer-stack-store'

export interface UseDrawerProps extends Optional<Omit<drawer.Props, 'dir' | 'getRootNode' | 'defaultSnapPoint'>, 'id'> {
  defaultSnapPoint?: drawer.SnapPoint | undefined
}
export interface UseDrawerReturn extends Accessor<drawer.Api<PropTypes>> {}

export const useDrawer = (props: MaybeFunction<UseDrawerProps>): UseDrawerReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()
  const stack = useDrawerStackStore()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      stack,
      ...resolvedProps,
    }
  })

  const service = useMachine(drawer.machine, () => machineProps)
  const api = $derived(drawer.connect(service, normalizeProps))
  return () => api
}
