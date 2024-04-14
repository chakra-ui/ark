import * as rating from '@zag-js/rating-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'
import { useId } from '../../utils/utils'

export interface UseRatingGroupProps extends Optional<rating.Context, 'id'> {
  modelValue?: rating.Context['value']
}

export interface UseRatingGroupReturn extends ComputedRef<rating.Api<PropTypes>> {}

export const useRatingGroup = (
  props: UseRatingGroupProps,
  emit: CallableFunction,
): UseRatingGroupReturn => {
  const getRootNode = useEnvironmentContext()
  const context = computed(() => {
    const { modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue,
    }
  })

  const [state, send] = useMachine(
    rating.machine({
      ...context.value,
      id: context.value.id || useId().value,
      getRootNode,
      onValueChange(details) {
        emit('value-change', details)
        emit('update:modelValue', details.value)
      },
      onHoverChange(details) {
        emit('hover-change', details)
      },
    }),
    { context },
  )

  return computed(() => rating.connect(state.value, send, normalizeProps))
}
