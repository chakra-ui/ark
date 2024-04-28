import * as zagSwitch from '@zag-js/switch'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './switch'

export interface UseSwitchProps
  extends Optional<Omit<zagSwitch.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The checked state of the switch when it is first rendered.
   * Use this when you do not need to control the state of the switch.
   */
  defaultChecked?: zagSwitch.Context['checked']
}

export interface UseSwitchReturn extends ComputedRef<zagSwitch.Api<PropTypes>> {}

export const useSwitch = (props: UseSwitchProps, emit: EmitFn<RootEmits>): UseSwitchReturn => {
  const env = useEnvironmentContext()

  const context = computed(() => {
    const { defaultChecked, checked, ...rest } = props
    return {
      ...rest,
      checked: checked ?? defaultChecked,
    }
  })

  const [state, send] = useMachine(
    zagSwitch.machine({
      ...context.value,
      id: context.value.id || useId().value,
      getRootNode: env?.value.getRootNode,
      onCheckedChange(details) {
        emit('checkedChange', details)
        emit('update:checked', details.checked)
      },
    }),
    { context },
  )

  return computed(() => zagSwitch.connect(state.value, send, normalizeProps))
}
