import { connect, machine } from '@zag-js/tags-input'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type ExtractPropTypes, type UnwrapRef } from 'vue'
import { useId } from '../utils'
import type { TagsInputContext } from './tags-input'

export const useTagsInput = <T extends ExtractPropTypes<TagsInputContext>>(
  emit: CallableFunction,
  context: T,
) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: reactiveContext.id || useId().value,
      value: reactiveContext.modelValue ?? reactiveContext.value,
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
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseTagsInputReturn = UnwrapRef<ReturnType<typeof useTagsInput>>
