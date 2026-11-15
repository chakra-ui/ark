import * as steps from '@zag-js/steps'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRefOrGetter, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
import type { EmitFn, Optional } from '../../types.ts'
import { cleanProps } from '../../utils/clean-props.ts'
import type { RootEmits } from './steps.types.ts'

export interface UseStepsProps extends Optional<Omit<steps.Props, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The v-model value of the stepper
   */
  modelValue?: string | null
}

export interface UseStepsReturn extends ComputedRef<steps.Api<PropTypes>> {}

export function useSteps(props: MaybeRefOrGetter<UseStepsProps>, emit?: EmitFn<RootEmits>): UseStepsReturn {
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const id = useId()

  const context = computed<steps.Props>(() => {
    const localProps = toValue<UseStepsProps>(props)

    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value?.getRootNode,
      value: localProps.modelValue ?? undefined,
      ...cleanProps(localProps),
      onValueChange: (details) => {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
        localProps.onValueChange?.(details)
      },
      onCompletedChange: (details) => {
        emit?.('completedChange', details)
        localProps.onCompletedChange?.(details)
      },
      onComplete: (details) => {
        emit?.('complete', details)
        localProps.onComplete?.(details)
      },
      onNavigationBlocked: (details) => {
        emit?.('navigationBlocked', details)
        localProps.onNavigationBlocked?.(details)
      },
    }
  })

  const service = useMachine(steps.machine, context)
  return computed(() => steps.connect(service, normalizeProps))
}
