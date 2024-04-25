import * as editable from '@zag-js/editable'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './editable'

export interface UseEditableProps extends Optional<editable.Context, 'id'> {
  modelValue?: editable.Context['value']
}

export interface UseEditableReturn extends ComputedRef<editable.Api<PropTypes>> {}

export const useEditable = (
  props: UseEditableProps,
  emit: EmitFn<RootEmits>,
): UseEditableReturn => {
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
        emit('valueChange', details)
        emit('update:modelValue', details.value)
      },
      onValueCommit(details) {
        emit('valueCommit', details)
      },
      onValueRevert(details) {
        emit('valueRevert', details)
      },
      onEdit() {
        emit('edit')
      },
    }),
    { context },
  )
  return computed(() => editable.connect(state.value, send, normalizeProps))
}
