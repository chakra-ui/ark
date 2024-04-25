import * as toggleGroup from '@zag-js/toggle-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './toggle-group'

export interface UseToggleGroupProps extends Optional<toggleGroup.Context, 'id'> {
  modelValue?: toggleGroup.Context['value']
}

export interface UseToggleGroupReturn extends ComputedRef<toggleGroup.Api<PropTypes>> {}

export const useToggleGroup = (
  props: UseToggleGroupProps,
  emit: EmitFn<RootEmits>,
): UseToggleGroupReturn => {
  const getRootNode = useEnvironmentContext()

  const context = computed(() => {
    const { modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue,
    }
  })

  const [state, send] = useMachine(
    toggleGroup.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onValueChange: (details) => {
        emit('valueChange', details)
        emit('update:modelValue', details.value)
      },
    }),
    { context },
  )

  return computed(() => toggleGroup.connect(state.value, send, normalizeProps))
}
