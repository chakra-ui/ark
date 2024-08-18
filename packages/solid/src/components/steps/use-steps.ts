import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as steps from '@zag-js/steps'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseStepsProps extends Optional<Omit<steps.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the step
   */
  defaultStep?: number
}

export interface UseStepsReturn extends Accessor<steps.Api<PropTypes>> {}

export function useSteps(props: UseStepsProps = {}): UseStepsReturn {
  const environment = useEnvironmentContext()
  const locale = useLocaleContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    step: props.defaultStep,
    ...props,
  }))

  const [state, send] = useMachine(steps.machine(context()), { context })

  return createMemo(() => steps.connect<PropTypes>(state, send, normalizeProps))
}
