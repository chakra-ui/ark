import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor } from '$lib/types'
import * as checkbox from '@zag-js/checkbox'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { useFieldContext } from '../field/index.ts'
import { useCheckboxGroupContext } from './use-checkbox-group-context.ts'

export interface UseCheckboxProps extends Omit<checkbox.Props, 'dir' | 'getRootNode'> {}

export interface UseCheckboxReturn extends Accessor<checkbox.Api<PropTypes>> {}

export const useCheckbox = (props: MaybeFunction<UseCheckboxProps>): UseCheckboxReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()
  const checkboxGroup = useCheckboxGroupContext()
  const field = useFieldContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    const localProps = mergeProps(checkboxGroup?.()?.getItemProps({ value: resolvedProps.value }) ?? {}, resolvedProps)
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
      id: resolvedProps.id,
    }
  })

  const service = useMachine(checkbox.machine, () => machineProps)
  const api = $derived(checkbox.connect(service, normalizeProps))

  return () => api
}
