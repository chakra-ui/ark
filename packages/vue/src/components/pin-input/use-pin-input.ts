import * as pinInput from '@zag-js/pin-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import { useFieldContext } from '../field'
import type { RootEmits } from './pin-input'

export interface UsePinInputProps extends Optional<Omit<pinInput.Props, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * The v-model value of the pin input
   */
  modelValue?: pinInput.Props['value']
}

export interface UsePinInputReturn extends ComputedRef<pinInput.Api<PropTypes>> {}

export const usePinInput = (props: UsePinInputProps = {}, emit?: EmitFn<RootEmits>) => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const context = computed<pinInput.Props>(() => ({
    id,
    ids: {
      label: field?.value.ids.label,
      hiddenInput: field?.value.ids.control,
    },
    disabled: field?.value.disabled,
    readOnly: field?.value.readOnly,
    required: field?.value.required,
    invalid: field?.value.invalid,
    dir: locale.value.dir,
    value: props.modelValue,
    getRootNode: env?.value.getRootNode,
    onValueChange: (details) => {
      emit?.('valueChange', details)
      emit?.('update:modelValue', details.value)
    },
    onValueComplete: (details) => emit?.('valueComplete', details),
    onValueInvalid: (details) => emit?.('valueInvalid', details),
    ...cleanProps(props),
  }))

  const service = useMachine(pinInput.machine, context)
  return computed(() => pinInput.connect(service, normalizeProps))
}
