import { connect, machine, type Context } from '@zag-js/radio-group'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, watch, type UnwrapRef } from 'vue'
import { type Optional } from '../types'
import { transformComposableProps, useId } from '../utils'

type UseRadioGroupPropsContext = Optional<Context, 'id'> & {
  modelValue?: Context['value']
}

export type UseRadioGroupProps = {
  context: UseRadioGroupPropsContext
  emit: CallableFunction
}

export const useRadioGroup = (props: UseRadioGroupProps) => {
  const { context, emit } = transformComposableProps(props)

  const [state, send] = useMachine(
    machine({
      ...context,
      id: useId().value,
      value: context.modelValue ?? context.value,
      onChange(details) {
        emit('change', details)
        emit('update:modelValue', details.value)
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  watch(
    () => context.modelValue,
    (val, oldVal) => {
      if (val == undefined || val === oldVal) return

      api.value.setValue(val)
    },
  )

  return api
}

export type UseRadioGroupReturn = UnwrapRef<ReturnType<typeof useRadioGroup>>
