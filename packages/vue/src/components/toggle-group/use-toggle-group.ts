import * as toggleGroup from '@zag-js/toggle-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './toggle-group'

export interface UseToggleGroupProps
  extends Optional<Omit<toggleGroup.Context, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * The initial value of the toggle group when it is first rendered.
   * Use when you do not need to control the state of the toggle group.
   */
  defaultValue?: toggleGroup.Context['value']
  modelValue?: toggleGroup.Context['value']
}

export interface UseToggleGroupReturn extends ComputedRef<toggleGroup.Api<PropTypes>> {}

export const useToggleGroup = (
  props: UseToggleGroupProps = {},
  emit?: EmitFn<RootEmits>,
): UseToggleGroupReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<toggleGroup.Context>(() => ({
    id,
    dir: locale.value.dir,
    value: props.modelValue ?? props.defaultValue,
    getRootNode: env?.value.getRootNode,
    onValueChange: (details) => {
      emit?.('valueChange', details)
      emit?.('update:modelValue', details.value)
    },
    ...cleanProps(props),
  }))

  const [state, send] = useMachine(toggleGroup.machine(context.value), { context })

  return computed(() => toggleGroup.connect(state.value, send, normalizeProps))
}
