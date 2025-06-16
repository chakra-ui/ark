import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import * as checkbox from '@zag-js/checkbox'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { useFieldContext } from '../field'
import { useCheckboxGroupContext } from './use-checkbox-group-context'

export interface UseCheckboxProps extends Optional<Omit<checkbox.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseCheckboxReturn extends Accessor<checkbox.Api<PropTypes>> {}

export const useCheckbox = (props: MaybeFunction<UseCheckboxProps> = {}): UseCheckboxReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()
  const checkboxGroup = useCheckboxGroupContext()
  const field = useFieldContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    const localProps = mergeProps(resolvedProps, checkboxGroup?.()?.getItemProps({ value: resolvedProps.value }) ?? {})
    return {
      ids: {
        label: field?.()?.ids.label,
        hiddenInput: field?.()?.ids.control,
      },
      dir: locale().dir,
      disabled: field?.()?.disabled,
      readOnly: field?.()?.readOnly,
      invalid: field?.()?.invalid,
      required: field?.()?.required,
      getRootNode: env().getRootNode,
      ...localProps,
    }
  })

  const service = useMachine(checkbox.machine, () => machineProps)
  const api = $derived(checkbox.connect(service, normalizeProps))

  return () => api
}
