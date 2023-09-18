import { connect, machine, type Api, type Context } from '@zag-js/switch'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseSwitchProps = Optional<Context, 'id'> & {
  modelValue?: Context['checked']
}
export type UseSwitchReturn = ComputedRef<Api<PropTypes>>

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
    machine({
      ...context.value,
      id: context.value.id || useId().value,
      getRootNode,
      onCheckedChange(details) {
        emit('change', details)
        emit('update:modelValue', details.checked)
      },
    }),
    { context },
  )

  return computed(() => connect(state.value, send, normalizeProps))
}
