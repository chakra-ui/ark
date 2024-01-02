import * as checkbox from '@zag-js/checkbox'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, ref, watch, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export interface UseCheckboxProps extends Optional<checkbox.Context, 'id'> {
  modelValue?: checkbox.Context['value']
}

export interface UseCheckboxReturn extends ComputedRef<checkbox.Api<PropTypes>> {}

export const useCheckbox = (props: UseCheckboxProps, emit: CallableFunction) => {
  const context = ref(props)
  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    checkbox.machine({
      ...context.value,
      id: context.value.id || useId().value,
      getRootNode,
      // @ts-ignore TODO: there should be a better option
      checked: context.value.modelValue ?? context.value.checked,
      onCheckedChange(details) {
        emit('checked-change', details)
        emit('update:modelValue', details.checked)
      },
    }),
    { context },
  )

  const api = computed(() => checkbox.connect(state.value, send, normalizeProps))

  watch(
    () => context.value.modelValue,
    (newValue, previousValue) => {
      if (newValue == undefined) return
      if (newValue !== previousValue) {
        // @ts-ignore
        api.value.setChecked(newValue)
      }
    },
  )

  watch(
    () => context.value.checked,
    (newValue, previousValue) => {
      if (newValue == undefined) return
      if (newValue !== previousValue) {
        api.value.setChecked(newValue)
      }
    },
  )

  return api
}
