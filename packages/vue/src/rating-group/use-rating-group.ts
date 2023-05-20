import { connect, machine } from '@zag-js/rating-group'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type ExtractPropTypes } from 'vue'
import { useId } from '../utils'
import type { RatingGroupContext } from './rating-group'

export const useRatingGroup = <T extends ExtractPropTypes<RatingGroupContext>>(
  emit: CallableFunction,
  context: T,
) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: reactiveContext.id || useId().value,
      value: reactiveContext.modelValue ?? reactiveContext.value,
      onChange(details) {
        emit('change', details.value)
        emit('update:modelValue', details.value)
      },
      onHover(details) {
        emit('hover', details)
      },
    }),
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseRatingGroupReturn = ReturnType<typeof useRatingGroup>
