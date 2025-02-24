import * as tabs from '@zag-js/tabs'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './tabs.types'

export interface UseTabsProps extends Optional<Omit<tabs.Props, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  modelValue?: tabs.Props['value']
}
export interface UseTabsReturn extends ComputedRef<tabs.Api<PropTypes>> {}

export const useTabs = (props: UseTabsProps = {}, emit?: EmitFn<RootEmits>): UseTabsReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<tabs.Props>(() => ({
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

  const service = useMachine(tabs.machine, context)
  return computed(() => tabs.connect(service, normalizeProps))
}
