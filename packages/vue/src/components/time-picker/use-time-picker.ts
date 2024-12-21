import * as timePicker from '@zag-js/time-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps, useId } from '../../utils'
import type { RootEmits } from './time-picker.types'

export interface UseTimePickerProps
  extends Optional<
    Omit<timePicker.Context, 'dir' | 'getRootNode' | 'open.controlled' | 'value'>,
    'id'
  > {
  /**
  /**
   * The initial open state of the time picker when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: timePicker.Context['open']
  /**
   * The initial value of the time picker when it is first rendered.
   * Use when you do not need to control the state of the time picker.
   */
  defaultValue?: timePicker.Context['value']
  /**
   * The v-model value of the time picker
   */
  modelValue?: timePicker.Context['value']
}

export interface UseTimePickerReturn extends ComputedRef<timePicker.Api<PropTypes>> {}

export const useTimePicker = (
  props: UseTimePickerProps = {},
  emit?: EmitFn<RootEmits>,
): UseTimePickerReturn => {
  const id = useId(props.id)
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<timePicker.Context>(() => {
    return {
      id,
      dir: locale.value.dir,
      open: props.defaultOpen,
      'open.controlled': props.open !== undefined,
      value: props.defaultValue ?? props.modelValue,
      getRootNode: env?.value.getRootNode,
      onFocusChange: (details) => emit?.('focusChange', details),
      onOpenChange: (details) => {
        emit?.('openChange', details)
        emit?.('update:open', details.open)
      },
      onValueChange: (details) => {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
      },
      ...cleanProps(props),
    }
  })

  const [state, send] = useMachine(timePicker.machine(context.value), { context })

  return computed(() => timePicker.connect(state.value, send, normalizeProps))
}
