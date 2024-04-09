import * as segmentGroup from '@zag-js/radio-group'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useId } from '../utils'

export interface UseSegmentGroupProps extends Optional<segmentGroup.Context, 'id'> {
  modelValue?: segmentGroup.Context['value']
}

export interface UseSegmentGroupReturn extends ComputedRef<segmentGroup.Api<PropTypes>> {}

export const useSegmentGroup = (
  props: UseSegmentGroupProps,
  emit: CallableFunction,
): UseSegmentGroupReturn => {
  const getRootNode = useEnvironmentContext()
  const context = computed(() => {
    const { modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue,
    }
  })

  const [state, send] = useMachine(
    segmentGroup.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onValueChange: (details) => {
        emit('value-change', details)
        emit('update:modelValue', details.value)
      },
    }),
    { context },
  )

  return computed(() => segmentGroup.connect(state.value, send, normalizeProps))
}
