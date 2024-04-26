import * as tagsInput from '@zag-js/tags-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './tags-input.types'

export interface UseTagsInputProps
  extends Optional<Omit<tagsInput.Context, 'dir' | 'getRootNode'>, 'id'> {
  modelValue?: tagsInput.Context['value']
}
export interface UseTagsInputReturn extends ComputedRef<tagsInput.Api<PropTypes>> {}

export const useTagsInput = (
  props: UseTagsInputProps,
  emit: EmitFn<RootEmits>,
): UseTagsInputReturn => {
  const env = useEnvironmentContext()

  const context = computed(() => {
    const { modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue,
    }
  })

  const [state, send] = useMachine(
    tagsInput.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode: env?.value.getRootNode,
      onValueChange(details) {
        emit('valueChange', details)
        emit('update:modelValue', details.value)
      },
      onFocusOutside: (details) => emit('focusOutside', details),
      onHighlightChange: (details) => emit('highlightChange', details),
      onInputValueChange: (details) => emit('inputValueChange', details),
      onInteractOutside: (details) => emit('interactOutside', details),
      onPointerDownOutside: (details) => emit('pointerDownOutside', details),
      onValueInvalid: (details) => emit('valueInvalid', details),
    }),
    { context },
  )

  return computed(() => tagsInput.connect(state.value, send, normalizeProps))
}
