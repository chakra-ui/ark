import * as tagsInput from '@zag-js/tags-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'
import { useId } from '../../utils'

export interface UseTagsInputProps extends Optional<tagsInput.Context, 'id'> {
  modelValue?: tagsInput.Context['value']
}
export interface UseTagsInputReturn extends ComputedRef<tagsInput.Api<PropTypes>> {}

export const useTagsInput = (
  props: UseTagsInputProps,
  emit: CallableFunction,
): UseTagsInputReturn => {
  const getRootNode = useEnvironmentContext()

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
      getRootNode,
      onValueChange(details) {
        emit('value-change', details)
        emit('update:modelValue', details.value)
      },
      onValueInvalid(details) {
        emit('value-invalid', details)
      },
      onHighlightChange(details) {
        emit('highlight-change', details)
      },
    }),
    { context },
  )

  return computed(() => tagsInput.connect(state.value, send, normalizeProps))
}
