import * as field from '@zag-js/field'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRefOrGetter, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
import type { EmitFn, Optional } from '../../types.ts'
import { cleanProps } from '../../utils/clean-props.ts'
import { useFieldsetContext } from '../fieldset/use-fieldset-context.ts'
import type { RootEmits } from './field.types.ts'

export interface UseFieldProps extends Optional<Omit<field.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseFieldReturn extends ComputedRef<field.Api<PropTypes>> {}

export const useField = (props: MaybeRefOrGetter<UseFieldProps> = {}, emit?: EmitFn<RootEmits>): UseFieldReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const fieldset = useFieldsetContext(undefined)

  const machineProps = computed<field.Props>(() => {
    const localProps = toValue<UseFieldProps>(props)
    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      disabled: fieldset?.value.disabled,
      ...cleanProps(localProps),
      onValidityChange: (details) => {
        emit?.('validityChange', details)
        localProps.onValidityChange?.(details)
      },
    }
  })

  const service = useMachine(field.machine, machineProps)
  return computed(() => field.connect(service, normalizeProps))
}
