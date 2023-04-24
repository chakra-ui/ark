import { connect, machine, type Context } from '@zag-js/radio-group'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, watch, type UnwrapRef } from 'vue'
import { type Optional } from '../types'
import { useId } from '../utils'

export type UseRadioGroupContext = Optional<Context, 'id'> & {
  modelValue?: Context['value']
}

export const useRadioGroup = (emit: CallableFunction, context: UseRadioGroupContext) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      value: reactiveContext.modelValue ?? reactiveContext.value,
      onChange(details) {
        emit('change', details)
        emit('update:modelValue', details.value)
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  watch(
    () => reactiveContext.modelValue,
    (val, oldVal) => {
      if (val == undefined || val === oldVal) return

      api.value.setValue(val)
    },
  )

  return api
}

export type UseRadioGroupReturn = UnwrapRef<ReturnType<typeof useRadioGroup>>
