import * as colorPicker from '@zag-js/color-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import { useFieldContext } from '../field'
import type { RootEmits } from './color-picker.types'

export interface UseColorPickerProps extends Optional<Omit<colorPicker.Props, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * The v-model value of the color picker
   */
  modelValue?: colorPicker.Props['value']
}
export interface UseColorPickerReturn extends ComputedRef<colorPicker.Api<PropTypes>> {}

export const useColorPicker = (props: UseColorPickerProps = {}, emit?: EmitFn<RootEmits>): UseColorPickerReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const context = computed<colorPicker.Props>(() => ({
    id,
    ids: {
      label: field?.value.ids.label,
      input: field?.value.ids.control,
    },
    disabled: field?.value.disabled,
    invalid: field?.value.invalid,
    readOnly: field?.value.readOnly,
    required: field?.value.required,
    dir: locale.value.dir,
    value: props.defaultValue ?? props.modelValue,

    getRootNode: env?.value.getRootNode,
    onOpenChange(details) {
      emit?.('openChange', details)
      emit?.('update:open', details.open)
    },
    onValueChange(details) {
      emit?.('valueChange', details)
      emit?.('update:modelValue', details.value)
    },
    onFocusOutside: (details) => emit?.('focusOutside', details),
    onFormatChange: (details) => emit?.('formatChange', details),
    onInteractOutside: (details) => emit?.('interactOutside', details),
    onPointerDownOutside: (details) => emit?.('pointerDownOutside', details),
    onValueChangeEnd: (details) => emit?.('valueChangeEnd', details),
    ...cleanProps(props),
  }))

  const service = useMachine(colorPicker.machine, context)
  return computed(() => colorPicker.connect(service, normalizeProps))
}
