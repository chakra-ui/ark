import * as tour from '@zag-js/tour'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './tour'

export interface UseTourProps extends Optional<Omit<tour.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTourReturn extends ComputedRef<tour.Api<PropTypes>> {}

export const useTour = (props: MaybeRef<UseTourProps> = {}, emit?: EmitFn<RootEmits>) => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<tour.Props>(() => {
    const localProps = toValue<UseTourProps>(props)

    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localProps),
      onFocusOutside: (details) => {
        emit?.('focusOutside', details)
        localProps.onFocusOutside?.(details)
      },
      onInteractOutside: (details) => {
        emit?.('interactOutside', details)
        localProps.onInteractOutside?.(details)
      },
      onPointerDownOutside: (details) => {
        emit?.('pointerDownOutside', details)
        localProps.onPointerDownOutside?.(details)
      },
      onStatusChange: (details) => {
        emit?.('statusChange', details)
        localProps.onStatusChange?.(details)
      },
      onStepChange: (details) => {
        emit?.('stepChange', details)
        localProps.onStepChange?.(details)
      },
      onStepsChange(details) {
        emit?.('stepsChange', details)
        localProps.onStepsChange?.(details)
      },
    }
  })

  const service = useMachine(tour.machine, context)
  return computed(() => tour.connect(service, normalizeProps))
}
