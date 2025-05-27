import * as colorPicker from '@zag-js/color-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
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

export const useColorPicker = (
  props: MaybeRef<UseColorPickerProps> = {},
  emit?: EmitFn<RootEmits>,
): UseColorPickerReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const context = computed<colorPicker.Props>(() => {
    const localProps = toValue<UseColorPickerProps>(props)

    return {
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
      value: localProps.modelValue,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localProps),
      onOpenChange(details) {
        emit?.('openChange', details)
        emit?.('update:open', details.open)
        localProps.onOpenChange?.(details)
      },
      onValueChange(details) {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
        localProps.onValueChange?.(details)
      },
      onFocusOutside: (details) => {
        emit?.('focusOutside', details)
        localProps.onFocusOutside?.(details)
      },
      onFormatChange: (details) => {
        emit?.('formatChange', details)
        emit?.('update:format', details.format)
        localProps.onFormatChange?.(details)
      },
      onInteractOutside: (details) => {
        emit?.('interactOutside', details)
        localProps.onInteractOutside?.(details)
      },
      onPointerDownOutside: (details) => {
        emit?.('pointerDownOutside', details)
        localProps.onPointerDownOutside?.(details)
      },
      onValueChangeEnd: (details) => {
        emit?.('valueChangeEnd', details)
        localProps.onValueChangeEnd?.(details)
      },
    }
  })

  const service = useMachine(colorPicker.machine, context)
  return computed(() => colorPicker.connect(service, normalizeProps))
}
