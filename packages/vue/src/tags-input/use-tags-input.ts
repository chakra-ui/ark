import { connect, machine, type Context } from '@zag-js/tags-input'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, type ExtractPropTypes } from 'vue'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseTagsInputContext = Optional<Context, 'id'> & {
  modelValue?: Context['value']
}

export const useTagsInput = <T extends ExtractPropTypes<UseTagsInputContext>>(
  emit: CallableFunction,
  context: T,
) => {
  const machineContext = computed(() => ({
    ...context,
    value: context.modelValue ?? context.value,
  }))

  const [state, send] = useMachine(
    machine({
      ...machineContext.value,
      id: machineContext.value.id || useId().value,
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

export type UseTagsInputReturn = ReturnType<typeof useTagsInput>
