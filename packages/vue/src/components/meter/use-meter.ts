import * as meter from '@zag-js/meter'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
import type { EmitFn, Optional } from '../../types.ts'
import { cleanProps } from '../../utils/clean-props.ts'
import type { RootEmits } from './meter.types.ts'

export interface UseMeterProps extends Optional<Omit<meter.Props, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The v-model value of the meter
   */
  modelValue?: meter.Props['value']
}
export interface UseMeterReturn extends ComputedRef<meter.Api<PropTypes>> {}

export const useMeter = (props: MaybeRef<UseMeterProps> = {}, emit?: EmitFn<RootEmits>): UseMeterReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<meter.Props>(() => {
    const localeProps = toValue<UseMeterProps>(props)

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

  const service = useMachine(meter.machine, context)
  return computed(() => meter.connect(service, normalizeProps))
}
