import * as checkbox from '@zag-js/checkbox'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import { useFieldContext } from '../field'
import type { RootEmits } from './checkbox'
import { useCheckboxGroupContext } from './use-checkbox-group-context'

export interface UseCheckboxProps extends Optional<Omit<checkbox.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseCheckboxReturn extends ComputedRef<checkbox.Api<PropTypes>> {}

export const useCheckbox = (ownProps: UseCheckboxProps = {}, emit?: EmitFn<RootEmits>) => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const checkboxGroup = useCheckboxGroupContext()
  const props = computed(() => {
    return mergeProps(ownProps, checkboxGroup?.value.getItemProps({ value: ownProps.value }) ?? {})
  })

  const context = computed<checkbox.Props>(() => ({
    id,
    ids: {
      label: field?.value.ids.label,
      hiddenInput: field?.value.ids.control,
    },
    disabled: field?.value.disabled,
    readOnly: field?.value.readOnly,
    invalid: field?.value.invalid,
    required: field?.value.required,
    dir: locale.value.dir,
    getRootNode: env?.value.getRootNode,
    onCheckedChange(details) {
      emit?.('checkedChange', details)
      emit?.('update:checked', details.checked)
    },
    ...cleanProps(props.value),
  }))

  const service = useMachine(checkbox.machine, context)

  return computed(() => checkbox.connect(service, normalizeProps))
}
