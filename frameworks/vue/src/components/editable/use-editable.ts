import * as editable from '@zag-js/editable'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './editable'

export interface UseEditableProps
  extends Optional<Omit<editable.Context, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * The initial value of the editable when it is first rendered.
   * Use when you do not need to control the state of the editable.
   */
  defaultValue?: editable.Context['value']
  modelValue?: editable.Context['value']
}

export interface UseEditableReturn extends ComputedRef<editable.Api<PropTypes>> {}

export const useEditable = (
  props: UseEditableProps,
  emit: EmitFn<RootEmits>,
): UseEditableReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const context = computed(() => {
    const { defaultValue, modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue ?? defaultValue,
    }
  })

  const [state, send] = useMachine(
    editable.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      onValueChange(details) {
        emit('valueChange', details)
        emit('update:modelValue', details.value)
      },
      onEdit: () => emit('edit'),
      onFocusOutside: (details) => emit('focusOutside', details),
      onInteractOutside: (details) => emit('interactOutside', details),
      onPointerDownOutside: (details) => emit('pointerDownOutside', details),
      onValueCommit: (details) => emit('valueCommit', details),
      onValueRevert: (details) => emit('valueRevert', details),
    }),
    { context },
  )
  return computed(() => editable.connect(state.value, send, normalizeProps))
}
