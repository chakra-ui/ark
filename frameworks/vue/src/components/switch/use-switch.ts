import * as zagSwitch from '@zag-js/switch'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'
import { useId } from '../../utils/utils'

export interface UseSwitchProps extends Optional<zagSwitch.Context, 'id'> {
  modelValue?: zagSwitch.Context['checked']
}

export interface UseSwitchReturn extends ComputedRef<zagSwitch.Api<PropTypes>> {}

export const useSwitch = (props: UseSwitchProps, emit: CallableFunction): UseSwitchReturn => {
  const getRootNode = useEnvironmentContext()

  const context = computed(() => {
    const { modelValue, ...rest } = props
    return {
      ...rest,
      checked: modelValue,
    }
  })

  const [state, send] = useMachine(
    zagSwitch.machine({
      ...context.value,
      id: context.value.id || useId().value,
      getRootNode,
      onCheckedChange(details) {
        emit('checked-change', details)
        emit('update:modelValue', details.checked)
      },
    }),
    { context },
  )

  return computed(() => zagSwitch.connect(state.value, send, normalizeProps))
}
