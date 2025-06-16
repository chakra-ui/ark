import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import * as accordion from '@zag-js/accordion'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseAccordionProps extends Optional<Omit<accordion.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseAccordionReturn extends Accessor<accordion.Api<PropTypes>> {}

export const useAccordion = (props?: MaybeFunction<UseAccordionProps>): UseAccordionReturn => {
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

  const service = useMachine(accordion.machine, () => machineProps)
  const api = $derived(accordion.connect(service, normalizeProps))

  return () => api
}
