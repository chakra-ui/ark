import * as numberFlow from '@zag-js/number-flow'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
import type { EmitFn, Optional } from '../../types.ts'
import { cleanProps } from '../../utils/clean-props.ts'
import type { RootEmits } from './number-flow.types.ts'

export interface UseNumberFlowProps extends Optional<Omit<numberFlow.Props, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The v-model value of the number flow
   */
  modelValue?: numberFlow.Props['value']
}
export interface UseNumberFlowReturn extends ComputedRef<numberFlow.Api<PropTypes>> {}

export const useNumberFlow = (
  props: MaybeRef<UseNumberFlowProps> = {},
  emit?: EmitFn<RootEmits>,
): UseNumberFlowReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<numberFlow.Props>(() => {
    const localeProps = toValue<UseNumberFlowProps>(props)

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
      onAnimationStart: (details) => {
        emit?.('animationStart', details)
        localeProps.onAnimationStart?.(details)
      },
      onAnimationComplete: (details) => {
        emit?.('animationComplete', details)
        localeProps.onAnimationComplete?.(details)
      },
    }
  })

  const service = useMachine(numberFlow.machine, context)
  return computed(() => numberFlow.connect(service, normalizeProps))
}
