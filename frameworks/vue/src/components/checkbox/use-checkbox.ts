import * as checkbox from '@zag-js/checkbox'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './checkbox'

export interface UseCheckboxProps extends Optional<checkbox.Context, 'id'> {
  /**
   * The initial checked state of the checkbox.
   */
  defaultChecked?: checkbox.Context['checked']
  'onUpdate:checked'?: (checked: checkbox.CheckedChangeDetails['checked']) => void
}

export interface UseCheckboxReturn extends ComputedRef<checkbox.Api<PropTypes>> {}

export const useCheckbox = (props: UseCheckboxProps, emit: EmitFn<RootEmits>) => {
  const context = ref(props)
  const env = useEnvironmentContext()

  const [state, send] = useMachine(
    checkbox.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode: env?.value.getRootNode,
      checked: props.checked ?? props.defaultChecked,
      onCheckedChange(details) {
        emit('checkedChange', details)
        emit('update:checked', details.checked)
      },
    }),
    { context },
  )

  return computed(() => checkbox.connect(state.value, send, normalizeProps))
}
