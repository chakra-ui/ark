import * as fieldset from '@zag-js/fieldset'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRefOrGetter, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
import type { Optional } from '../../types.ts'
import { cleanProps } from '../../utils/clean-props.ts'

export interface UseFieldsetProps extends Optional<Omit<fieldset.Props, 'dir' | 'disabled' | 'getRootNode'>, 'id'> {
  /**
   * Whether the fieldset is disabled.
   */
  disabled?: boolean | 'true' | 'false' | undefined
}
export interface UseFieldsetReturn extends ComputedRef<fieldset.Api<PropTypes>> {}

export const useFieldset = (props: MaybeRefOrGetter<UseFieldsetProps> = {}): UseFieldsetReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const machineProps = computed<fieldset.Props>(() => {
    const { disabled, ...localProps } = toValue<UseFieldsetProps>(props)
    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localProps),
      disabled: disabled === undefined ? undefined : disabled === true || disabled === 'true',
    }
  })

  const service = useMachine(fieldset.machine, machineProps)
  return computed(() => fieldset.connect(service, normalizeProps))
}
