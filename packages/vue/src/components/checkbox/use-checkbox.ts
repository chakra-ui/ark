import * as checkbox from '@zag-js/checkbox'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils/clean-props'
import { useFieldContext } from '../field'
import type { RootEmits } from './checkbox'
import { useCheckboxGroupContext } from './use-checkbox-group-context'

export interface UseCheckboxProps extends Optional<Omit<checkbox.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseCheckboxReturn extends ComputedRef<checkbox.Api<PropTypes>> {}

export const useCheckbox = (props: MaybeRef<UseCheckboxProps> = {}, emit?: EmitFn<RootEmits>) => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const checkboxGroup = useCheckboxGroupContext()
  const computedProps = computed(() => {
    const propsValue = toValue<UseCheckboxProps>(props)
    return mergeProps(checkboxGroup?.value.getItemProps({ value: propsValue.value }) ?? {}, propsValue)
  })

  const context = computed<checkbox.Props>(() => {
    const localProps = toValue<UseCheckboxProps>(computedProps)

    return {
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
      ...cleanProps(localProps),
      onCheckedChange(details) {
        emit?.('checkedChange', details)
        emit?.('update:checked', details.checked)
        localProps.onCheckedChange?.(details)
      },
    }
  })

  const service = useMachine(checkbox.machine, context)
  return computed(() => checkbox.connect(service, normalizeProps))
}
