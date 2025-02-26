import * as toggle from '@zag-js/toggle'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import type { EmitFn } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits, RootProps } from './toggle.types'

export interface UseToggleProps extends RootProps {}

export interface UseToggleReturn extends ComputedRef<toggle.Api<PropTypes>> {}

export function useToggle(props: UseToggleProps, emit?: EmitFn<RootEmits>): UseToggleReturn {
  const service = useMachine(toggle.machine, {
    pressed: props.modelValue,
    onPressedChange: (value) => {
      emit?.('update:modelValue', value)
    },
    ...cleanProps(props),
  })
  return computed(() => toggle.connect(service, normalizeProps))
}
