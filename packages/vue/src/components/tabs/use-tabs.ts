import * as tabs from '@zag-js/tabs'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './tabs.types'

export interface UseTabsProps extends Optional<Omit<tabs.Props, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The v-model value of the tabs
   */
  modelValue?: tabs.Props['value']
}

export interface UseTabsReturn extends ComputedRef<tabs.Api<PropTypes>> {}

export const useTabs = (props: MaybeRef<UseTabsProps> = {}, emit?: EmitFn<RootEmits>): UseTabsReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<tabs.Props>(() => {
    const localProps = toValue<UseTabsProps>(props)

    return {
      id,
      dir: locale.value.dir,
      value: localProps.modelValue,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localProps),
      onFocusChange: (details) => {
        emit?.('focusChange', details)
        localProps.onFocusChange?.(details)
      },
      onValueChange: (details) => {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
        localProps.onValueChange?.(details)
      },
    }
  })

  const service = useMachine(tabs.machine, context)
  return computed(() => tabs.connect(service, normalizeProps))
}
