import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as tour from '@zag-js/tour'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.tsx'
import type { MaybeAccessor, Optional } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'

export interface UseTourProps extends Optional<Omit<tour.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTourReturn extends Accessor<tour.Api<PropTypes>> {}

export const useTour = (props?: MaybeAccessor<UseTourProps>): UseTourReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(tour.machine, machineProps)
  return createMemo(() => tour.connect(service, normalizeProps))
}
