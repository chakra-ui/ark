import * as editable from '@zag-js/editable'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'
import { useId } from '../../utils'

export interface UseEditableProps extends Optional<editable.Context, 'id'> {
  modelValue?: editable.Context['value']
}

export interface UseEditableReturn extends ComputedRef<editable.Api<PropTypes>> {}

export const useEditable = (props: UseEditableProps, emit: CallableFunction): UseEditableReturn => {
  const getRootNode = useEnvironmentContext()
  const context = computed(() => {
    const { modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue,
    }
  })

  const [state, send] = useMachine(
    editable.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onValueChange(details) {
        emit('value-change', details)
        emit('update:modelValue', details.value)
      },
      onValueCommit(details) {
        emit('value-commit', details)
      },
      onValueRevert(details) {
        emit('value-revert', details)
      },
      onEdit() {
        emit('edit')
      },
    }),
    { context },
  )
  return computed(() => editable.connect(state.value, send, normalizeProps))
}
