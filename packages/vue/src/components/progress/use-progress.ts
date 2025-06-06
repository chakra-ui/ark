import * as progress from '@zag-js/progress'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './progress.types'

export interface UseProgressProps extends Optional<Omit<progress.Props, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The v-model value of the progress
   */
  modelValue?: progress.Props['value']
}
export interface UseProgressReturn extends ComputedRef<progress.Api<PropTypes>> {}

export const useProgress = (props: MaybeRef<UseProgressProps> = {}, emit?: EmitFn<RootEmits>): UseProgressReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<progress.Props>(() => {
    const localeProps = toValue<UseProgressProps>(props)

    return {
      id,
      dir: locale.value.dir,
      locale: locale.value.locale,
      value: localeProps.modelValue,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localeProps),
      onValueChange: (details) => {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
        localeProps.onValueChange?.(details)
      },
    }
  })

  const service = useMachine(progress.machine, context)
  return computed(() => progress.connect(service, normalizeProps))
}
