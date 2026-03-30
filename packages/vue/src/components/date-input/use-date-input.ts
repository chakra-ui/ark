import * as dateInput from '@zag-js/date-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils/clean-props'
import type { RootEmits } from './date-input.types'

export interface UseDateInputProps extends Optional<Omit<dateInput.Props, 'dir' | 'getRootNode'>, 'id'> {
  modelValue?: dateInput.Props['value']
}

export interface UseDateInputReturn extends ComputedRef<dateInput.Api<PropTypes>> {}

export const useDateInput = (props: MaybeRef<UseDateInputProps> = {}, emit?: EmitFn<RootEmits>): UseDateInputReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<dateInput.Props>(() => {
    const localeProps = toValue<UseDateInputProps>(props)

    return {
      id,
      dir: locale.value.dir,
      locale: locale.value.locale,
      value: localeProps.modelValue,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localeProps),
      onFocusChange: (details) => {
        emit?.('focusChange', details)
        localeProps.onFocusChange?.(details)
      },
      onValueChange: (details) => {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
        localeProps.onValueChange?.(details)
      },
    }
  })

  const service = useMachine(dateInput.machine as any, context)
  return computed(() => dateInput.connect(service as any, normalizeProps))
}
