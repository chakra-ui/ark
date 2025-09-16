import * as steps from '@zag-js/steps'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils/clean-props'
import type { RootEmits } from './steps.types'

export interface UseStepsProps extends Optional<Omit<steps.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseStepsReturn extends ComputedRef<steps.Api<PropTypes>> {}

export function useSteps(props: MaybeRef<UseStepsProps> = {}, emit?: EmitFn<RootEmits>): UseStepsReturn {
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const id = useId()

  const context = computed<steps.Props>(() => {
    const localProps = toValue<UseStepsProps>(props)

    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value?.getRootNode,
      ...cleanProps(localProps),
      onStepChange: (details) => {
        emit?.('stepChange', details)
        emit?.('update:step', details.step)
        localProps.onStepChange?.(details)
      },
      onStepComplete: () => {
        emit?.('stepComplete')
        localProps.onStepComplete?.()
      },
    }
  })

  const service = useMachine(steps.machine, context)
  return computed(() => steps.connect(service, normalizeProps))
}
