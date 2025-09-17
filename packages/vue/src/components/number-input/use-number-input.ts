import * as numberInput from '@zag-js/number-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils/clean-props'
import { useFieldContext } from '../field'
import type { RootEmits } from './number-input.types'

export interface UseNumberInputProps extends Optional<Omit<numberInput.Props, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The v-model value of the number input
   */
  modelValue?: numberInput.Props['value']
}

export interface UseNumberInputReturn extends ComputedRef<numberInput.Api<PropTypes>> {}

export const useNumberInput = (
  props: MaybeRef<UseNumberInputProps> = {},
  emit?: EmitFn<RootEmits>,
): UseNumberInputReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const context = computed<numberInput.Props>(() => {
    const localeProps = toValue<UseNumberInputProps>(props)

    return {
      id,
      ids: {
        label: field?.value.ids.label,
        input: field?.value.ids.control,
      },
      disabled: field?.value.disabled,
      readOnly: field?.value.readOnly,
      required: field?.value.required,
      invalid: field?.value.invalid,
      dir: locale.value.dir,
      locale: locale.value.locale,
      value: localeProps.modelValue,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localeProps),
      onValueChange: (details) => {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
        localeProps.onValueChange?.(details)
      },
      onFocusChange: (details) => {
        emit?.('focusChange', details)
        localeProps.onFocusChange?.(details)
      },
      onValueInvalid: (details) => {
        emit?.('valueInvalid', details)
        localeProps.onValueInvalid?.(details)
      },
    }
  })

  const service = useMachine(numberInput.machine, context)
  return computed(() => numberInput.connect(service, normalizeProps))
}
