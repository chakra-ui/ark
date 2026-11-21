import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor } from '$lib/types'
import * as fieldset from '@zag-js/fieldset'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseFieldsetProps extends Omit<fieldset.Props, 'dir' | 'getRootNode'> {}

export interface UseFieldsetReturn extends Accessor<fieldset.Api<PropTypes>> {}

export const useFieldset = (props: MaybeFunction<UseFieldsetProps>): UseFieldsetReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived.by(() => ({
    dir: locale().dir,
    getRootNode: env().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(fieldset.machine, () => machineProps)
  const api = $derived(fieldset.connect(service, normalizeProps))

  return () => api
}
