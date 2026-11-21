import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor } from '$lib/types'
import * as field from '@zag-js/field'
import { useFieldsetContext } from '../fieldset/use-fieldset-context.ts'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseFieldProps extends Omit<field.Props, 'dir' | 'getRootNode'> {}

export interface UseFieldReturn extends Accessor<field.Api<PropTypes>> {}

export const useField = (props: MaybeFunction<UseFieldProps>): UseFieldReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()
  const fieldset = useFieldsetContext()

  const machineProps = $derived.by(() => ({
    dir: locale().dir,
    getRootNode: env().getRootNode,
    disabled: fieldset?.().disabled,
    ...runIfFn(props),
  }))

  const service = useMachine(field.machine, () => machineProps)
  const api = $derived(field.connect(service, normalizeProps))

  return () => api
}
