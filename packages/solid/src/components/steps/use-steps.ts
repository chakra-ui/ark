import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as steps from '@zag-js/steps'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseStepsProps extends Optional<Omit<steps.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseStepsReturn extends Accessor<steps.Api<PropTypes>> {}

export function useSteps(props: UseStepsProps = {}): UseStepsReturn {
  const id = createUniqueId()
  const environment = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = createMemo<steps.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props,
  }))

  const service = useMachine(steps.machine, machineProps)
  return createMemo(() => steps.connect<PropTypes>(service, normalizeProps))
}
