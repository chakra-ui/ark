import * as tour from '@zag-js/tour'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './tour'

export interface UseTourProps extends Optional<Omit<tour.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTourReturn extends ComputedRef<tour.Api<PropTypes>> {}

export const useTour = (props: UseTourProps = {}, emit?: EmitFn<RootEmits>) => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<tour.Props>(() => ({
    id,
    dir: locale.value.dir,
    getRootNode: env?.value.getRootNode,
    onFocusOutside: (details) => emit?.('focusOutside', details),
    onInteractOutside: (details) => emit?.('interactOutside', details),
    onPointerDownOutside: (details) => emit?.('pointerDownOutside', details),
    onStatusChange: (details) => emit?.('statusChange', details),
    onStepChange: (details) => emit?.('stepChange', details),
    ...cleanProps(props),
  }))

  const service = useMachine(tour.machine, context)
  return computed(() => tour.connect(service, normalizeProps))
}
