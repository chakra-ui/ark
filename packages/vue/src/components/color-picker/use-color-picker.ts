import * as colorPicker from '@zag-js/color-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import { useFieldContext } from '../field'
import type { RootEmits } from './color-picker.types'

export interface UseColorPickerProps extends Optional<Omit<colorPicker.Props, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The v-model value of the color picker
   */
  modelValue?: colorPicker.Color
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
    value: props.modelValue,
    getRootNode: env?.value.getRootNode,
    ...cleanProps(props),
    onOpenChange(details) {
      emit?.('openChange', details)
      emit?.('update:open', details.open)
      props.onOpenChange?.(details)
    },
    onValueChange(details) {
      emit?.('valueChange', details)
      emit?.('update:modelValue', details.value)
      props.onValueChange?.(details)
    },
    onFocusOutside: (details) => {
      emit?.('focusOutside', details)
      props.onFocusOutside?.(details)
    },
    onFormatChange: (details) => {
      emit?.('formatChange', details)
      emit?.('update:format', details.format)
      props.onFormatChange?.(details)
    },
    onInteractOutside: (details) => {
      emit?.('interactOutside', details)
      props.onInteractOutside?.(details)
    },
    onPointerDownOutside: (details) => {
      emit?.('pointerDownOutside', details)
      props.onPointerDownOutside?.(details)
    },
    onValueChangeEnd: (details) => {
      emit?.('valueChangeEnd', details)
      props.onValueChangeEnd?.(details)
    },
  }))

  const service = useMachine(colorPicker.machine, context)
  return computed(() => colorPicker.connect(service, normalizeProps))
}
