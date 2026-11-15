import * as toggle from '@zag-js/toggle'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRefOrGetter, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, useEnvironmentContext } from '../../providers/index.ts'
import type { EmitFn, Optional } from '../../types.ts'
import { cleanProps } from '../../utils/clean-props.ts'
import type { RootEmits } from './toggle.types.ts'

export interface UseToggleProps extends Optional<Omit<toggle.Props, 'getRootNode'>, 'id'> {}

export interface UseToggleReturn extends ComputedRef<toggle.Api<PropTypes>> {}

export function useToggle(props: MaybeRefOrGetter<UseToggleProps>, emit?: EmitFn<RootEmits>): UseToggleReturn {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)

  const machineProps = computed<toggle.Props>(() => {
    const localProps = toValue<UseToggleProps>(props)

    return {
      id,
      getRootNode: env?.value.getRootNode,
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
