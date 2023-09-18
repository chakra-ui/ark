import { connect, machine } from '@zag-js/rating-group'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import { useId } from '../utils'
import type { RatingGroupContext } from './rating-group'

export const useRatingGroup = <T extends ExtractPropTypes<RatingGroupContext>>(
  emit: CallableFunction,
  context: T,
) => {
  const reactiveContext = reactive(context)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: reactiveContext.id || useId().value,
      getRootNode,
      value: reactiveContext.modelValue ?? reactiveContext.value,
      onValueChange(details) {
        emit('change', details)
        emit('update:modelValue', details.value)
      },
      onHoverChange(details) {
        emit('hover-change', details)
      },
    }),
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseRatingGroupReturn = ReturnType<typeof useRatingGroup>
