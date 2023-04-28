import { connect, machine, type Context } from '@zag-js/radio-group'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type UnwrapRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useId } from '../utils'

export type UseRadioGroupContext = Optional<Context, 'id'> & {
  modelValue?: Context['value']
}

export const useRadioGroup = (emit: CallableFunction, context: UseRadioGroupContext) => {
  const reactiveContext = reactive(context)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      getRootNode,
      value: reactiveContext.modelValue ?? reactiveContext.value,
      onChange(details) {
        emit('change', details)
        emit('update:modelValue', details.value)
      },
    }),
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseRadioGroupReturn = UnwrapRef<ReturnType<typeof useRadioGroup>>
