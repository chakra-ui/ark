import { connect, machine, type Context as TagsInputContext } from '@zag-js/tags-input'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type UnwrapRef } from 'vue'
import type { Optional } from '../types'
import { useId } from '../utils'

type UseTagsInputPropsContext = Optional<TagsInputContext, 'id'> & {
  modelValue?: TagsInputContext['value']
}

export type UseTagsInputProps = {
  context: UseTagsInputPropsContext
  emit: CallableFunction
}

export const useTagsInput = (emit: CallableFunction, context: UseTagsInputPropsContext) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      value: reactiveContext.modelValue ?? reactiveContext.value,
      onChange(details) {
        emit('change', details)
        emit('update:modelValue', details.values)
      },
      onHighlight(details) {
        emit('highlight', details)
      },
      onInvalid(details) {
        emit('invalid', details)
      },
      onTagUpdate(details) {
        emit('tag-update', details)
      },
    }),
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseTagsInputReturn = UnwrapRef<ReturnType<typeof useTagsInput>>
