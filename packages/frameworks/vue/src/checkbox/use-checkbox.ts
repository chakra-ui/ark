import * as checkbox from '@zag-js/checkbox'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, reactive, watch, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseCheckboxProps = Optional<checkbox.Context, 'id'> & {
  modelValue?: checkbox.Context['value']
}

export type UseCheckboxReturn = ComputedRef<checkbox.Api<PropTypes>>

export const useCheckbox = (emit: CallableFunction, context: UseCheckboxProps) => {
  const reactiveContext = reactive(context)
  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    checkbox.machine({
      ...reactiveContext,
      id: reactiveContext.id || useId().value,
      getRootNode,
      // @ts-ignore TODO: there should be a better option
      checked: reactiveContext.modelValue ?? reactiveContext.checked,
      onCheckedChange(details) {
        emit('checked-change', details)
        emit('update:modelValue', details.checked)
      },
    }),
  )

  const api = computed(() => checkbox.connect(state.value, send, normalizeProps))

  watch(
    () => reactiveContext.modelValue,
    (newValue, previousValue) => {
      if (newValue == undefined) return
      if (newValue !== previousValue) {
        // @ts-ignore
        api.value.setChecked(newValue)
      }
    },
  )

  watch(
    () => reactiveContext.checked,
    (newValue, previousValue) => {
      if (newValue == undefined) return
      if (newValue !== previousValue) {
        api.value.setChecked(newValue)
      }
    },
  )

  return api
}
