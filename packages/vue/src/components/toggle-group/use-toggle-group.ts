import * as toggleGroup from '@zag-js/toggle-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './toggle-group'

export interface UseToggleGroupProps extends Optional<Omit<toggleGroup.Props, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The v-model value of the toggle group
   */
  modelValue?: toggleGroup.Props['value']
}

export interface UseToggleGroupReturn extends ComputedRef<toggleGroup.Api<PropTypes>> {}

export const useToggleGroup = (
  props: MaybeRef<UseToggleGroupProps> = {},
  emit?: EmitFn<RootEmits>,
): UseToggleGroupReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<toggleGroup.Props>(() => {
    const localProps = toValue<UseToggleGroupProps>(props)

    return {
      id,
      dir: locale.value.dir,
      value: localProps.modelValue,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localProps),
      onValueChange: (details) => {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
        localProps.onValueChange?.(details)
      },
    }
  })

  const service = useMachine(toggleGroup.machine, context)
  return computed(() => toggleGroup.connect(service, normalizeProps))
}
