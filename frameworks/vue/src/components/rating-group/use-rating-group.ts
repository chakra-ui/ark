import * as ratingGroup from '@zag-js/rating-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './rating-group'

export interface UseRatingGroupProps
  extends Optional<Omit<ratingGroup.Context, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * The initial value of the rating group when it is first rendered.
   * Use when you do not need to control the state of the rating group.
   */
  defaultValue?: ratingGroup.Context['value']
  modelValue?: ratingGroup.Context['value']
}

export interface UseRatingGroupReturn extends ComputedRef<ratingGroup.Api<PropTypes>> {}

export const useRatingGroup = (
  props: UseRatingGroupProps,
  emit: EmitFn<RootEmits>,
): UseRatingGroupReturn => {
  const env = useEnvironmentContext()
  const context = computed(() => {
    const { defaultValue, modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue ?? defaultValue,
    }
  })

  const [state, send] = useMachine(
    ratingGroup.machine({
      ...context.value,
      id: context.value.id || useId().value,
      getRootNode: env?.value.getRootNode,
      onValueChange(details) {
        emit('valueChange', details)
        emit('update:modelValue', details.value)
      },
      onHoverChange: (details) => emit('hoverChange', details),
    }),
    { context },
  )

  return computed(() => ratingGroup.connect(state.value, send, normalizeProps))
}
