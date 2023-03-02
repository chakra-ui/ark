import { connect, Context as TagsInputContext, machine } from '@zag-js/tags-input'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, UnwrapRef } from 'vue'
import type { Optional } from '../types'
import { transformComposableProps, useId } from '../utils'

type UseTagsInputPropsContext = Optional<TagsInputContext, 'id'> & {
  modelValue?: TagsInputContext['value']
}

export type UseTagsInputProps = {
  context: UseTagsInputPropsContext
  emit: CallableFunction
}

export const useTagsInput = (props: UseTagsInputProps) => {
  const { context, emit } = transformComposableProps(props)

  const [state, send] = useMachine(
    machine({
      ...context,
      id: useId().value,
      value: context.modelValue ?? context.value,
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
