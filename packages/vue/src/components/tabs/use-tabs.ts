import * as tabs from '@zag-js/tabs'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps, useId } from '../../utils'
import type { RootEmits } from './tabs.types'

export interface UseTabsProps
  extends Optional<Omit<tabs.Context, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * The initial value of the tabs when it is first rendered.
   * Use when you do not need to control the state of the tabs.
   */
  defaultValue?: tabs.Context['value']
  modelValue?: tabs.Context['value']
}
export interface UseTabsReturn extends ComputedRef<tabs.Api<PropTypes>> {}

export const useTabs = (props: UseTabsProps, emit?: EmitFn<RootEmits>): UseTabsReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<tabs.Context>(() => ({
    id,
    dir: locale.value.dir,
    value: props.modelValue ?? props.defaultValue,
    getRootNode: env?.value.getRootNode,
    onFocusChange: (details) => emit?.('focusChange', details),
    onValueChange: (details) => {
      emit?.('valueChange', details)
      emit?.('update:modelValue', details.value)
    },
    ...cleanProps(props),
  }))

  const [state, send] = useMachine(tabs.machine(context.value), { context })

  return computed(() => tabs.connect(state.value, send, normalizeProps))
}
