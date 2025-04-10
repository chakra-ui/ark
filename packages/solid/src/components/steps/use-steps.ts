import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as steps from '@zag-js/steps'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'

export interface UseStepsProps extends Optional<Omit<steps.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseStepsReturn extends Accessor<steps.Api<PropTypes>> {}

export function useSteps(props?: MaybeAccessor<UseStepsProps>): UseStepsReturn {
  const id = createUniqueId()
  const environment = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = createMemo<steps.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(steps.machine, machineProps)
  return createMemo(() => steps.connect<PropTypes>(service, normalizeProps))
}
