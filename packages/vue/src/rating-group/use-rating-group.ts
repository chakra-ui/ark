import { connect, machine, type Context as RatingGroupContext } from '@zag-js/rating-group'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive } from 'vue'
import { useEnvironmentContext } from '../environment'
import { useId } from '../utils'

export type UseRatingGroupContext = Omit<RatingGroupContext, 'id'> & {
  modelValue?: RatingGroupContext['value']
}

export const useRatingGroup = (emit: CallableFunction, context: UseRatingGroupContext) => {
  const reactiveContext = reactive(context)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      getRootNode,
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
