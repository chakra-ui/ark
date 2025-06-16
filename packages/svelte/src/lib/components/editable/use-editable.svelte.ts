import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import * as editable from '@zag-js/editable'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { useFieldContext } from '../field'

export interface UseEditableProps extends Optional<Omit<editable.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseEditableReturn extends Accessor<editable.Api<PropTypes>> {}

export const useEditable = (props?: MaybeFunction<UseEditableProps>): UseEditableReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()
  const field = useFieldContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props) || {}
    return {
      getRootNode: env().getRootNode,
      dir: locale().dir,
      ids: {
        label: field?.()?.ids.label,
        input: field?.()?.ids.control,
      },
      disabled: field?.()?.disabled,
      invalid: field?.()?.invalid,
      readOnly: field?.()?.readOnly,
      required: field?.()?.required,
      ...resolvedProps,
    }
  })

  const service = useMachine(editable.machine, () => machineProps)
  const api = $derived(editable.connect(service, normalizeProps))

  return () => api
}
