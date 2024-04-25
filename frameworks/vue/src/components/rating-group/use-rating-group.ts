import * as ratingGroup from '@zag-js/rating-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './rating-group'

export interface UseRatingGroupProps extends Optional<ratingGroup.Context, 'id'> {
  modelValue?: ratingGroup.Context['value']
}

export interface UseRatingGroupReturn extends ComputedRef<ratingGroup.Api<PropTypes>> {}

export const useRatingGroup = (
  props: UseRatingGroupProps,
  emit: EmitFn<RootEmits>,
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
    ratingGroup.machine({
      ...context.value,
      id: context.value.id || useId().value,
      getRootNode,
      onValueChange(details) {
        emit('valueChange', details)
        emit('update:modelValue', details.value)
      },
      onHoverChange(details) {
        emit('hoverChange', details)
      },
    }),
    { context },
  )

  return computed(() => ratingGroup.connect(state.value, send, normalizeProps))
}
