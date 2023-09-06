import * as editable from '@zag-js/editable'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { generateEventMap, useId } from '../utils'
import { emits } from './editable.props'

export type UseEditableProps = Optional<editable.Context, 'id'> & {
  modelValue?: editable.Context['value']
}
export type UseEditableReturn = ComputedRef<editable.Api<PropTypes>>

export const useEditable = (props: UseEditableProps, emit: CallableFunction): UseEditableReturn => {
  const getRootNode = useEnvironmentContext()
  const context = computed(() => {
    const { modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue,
    }
  })
  const eventMap = generateEventMap(emits, emit)

  const [state, send] = useMachine(
    editable.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      ...eventMap,
      onChange(details) {
        emit('change', details)
        emit('update:modelValue', details.value)
      },
    }),
    { context },
  )
  return computed(() => editable.connect(state.value, send, normalizeProps))
}
