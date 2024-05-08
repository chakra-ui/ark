import * as colorPicker from '@zag-js/color-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './color-picker.types'

export interface UseColorPickerProps
  extends Optional<
    Omit<colorPicker.Context, 'dir' | 'getRootNode' | 'open.controlled' | 'value'>,
    'id'
  > {
  modelValue?: string
  /**
   * The initial open state of the color picker.
   */
  defaultOpen?: colorPicker.Context['open']
  /**
   * The initial value of the color picker when it is first rendered.
   * Use when you do not need to control the state of the color picker.
   */
  defaultValue?: string
}
export interface UseColorPickerReturn extends ComputedRef<colorPicker.Api<PropTypes>> {}

export const useColorPicker = (
  props: UseColorPickerProps,
  emit: EmitFn<RootEmits>,
): UseColorPickerReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<colorPicker.Context>(() => ({
    id: id.value,
    dir: locale.value.dir,
    open: props.defaultOpen,
    'open.controlled': props.open !== undefined,
    value: colorPicker.parse(props.defaultValue ?? props.modelValue ?? ''),
    getRootNode: env?.value.getRootNode,
    onOpenChange(details) {
      emit('openChange', details)
      emit('update:open', details.open)
    },
    onValueChange(details) {
      emit('valueChange', details)
      emit('update:modelValue', details.valueAsString)
    },
    onFocusOutside: (details) => emit('focusOutside', details),
    onFormatChange: (details) => emit('formatChange', details),
    onInteractOutside: (details) => emit('interactOutside', details),
    onPointerDownOutside: (details) => emit('pointerDownOutside', details),
    onValueChangeEnd: (details) => emit('valueChangeEnd', details),
    ...props,
  }))
  const [state, send] = useMachine(colorPicker.machine(context.value), { context })

  return computed(() => colorPicker.connect(state.value, send, normalizeProps))
}
