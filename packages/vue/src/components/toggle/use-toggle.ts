import * as toggle from '@zag-js/toggle'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue } from 'vue'
import type { EmitFn } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './toggle.types'

export interface UseToggleProps extends toggle.Props {}

export interface UseToggleReturn extends ComputedRef<toggle.Api<PropTypes>> {}

export function useToggle(props: MaybeRef<UseToggleProps>, emit?: EmitFn<RootEmits>): UseToggleReturn {
  const machineProps = computed<toggle.Props>(() => {
    const localProps = toValue<UseToggleProps>(props)

    return {
      ...cleanProps(localProps),
      onPressedChange: (value) => {
        emit?.('pressedChange', value)
        emit?.('update:pressed', value)
        localProps.onPressedChange?.(value)
      },
    }
  })
  const service = useMachine(toggle.machine, machineProps)
  return computed(() => toggle.connect(service, normalizeProps))
}
