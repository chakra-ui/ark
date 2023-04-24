import { connect, machine, type Context as RatingGroupContext } from '@zag-js/rating-group'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive } from 'vue'
import { useId } from '../utils'

export type UseRatingGroupContext = Omit<RatingGroupContext, 'id'> & {
  modelValue?: RatingGroupContext['value']
}

export const useRatingGroup = (emit: CallableFunction, context: UseRatingGroupContext) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      value: reactiveContext.modelValue,
      onChange(details) {
        emit('change', details.value)
        emit('update:modelValue', details.value)
      },
      onHover(details) {
        emit('hover', details)
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  return api
}

export type UseRatingGroupReturn = ReturnType<typeof useRatingGroup>
