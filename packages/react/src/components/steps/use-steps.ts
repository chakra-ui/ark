import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as steps from '@zag-js/steps'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseStepsProps extends Optional<Omit<steps.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the step
   */
  defaultStep?: number
}

export interface UseStepsReturn extends steps.Api<PropTypes> {}

export function useSteps(props: UseStepsProps = {}): UseStepsReturn {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const initialContext: steps.Context = {
    id: useId(),
    dir,
    getRootNode,
    step: props.defaultStep,
    ...props,
  }

  const context: steps.Context = {
    ...initialContext,
    step: props.step,
    onStepChange: useEvent(props.onStepChange),
    onStepComplete: useEvent(props.onStepComplete),
  }

  const [state, send] = useMachine(steps.machine(initialContext), {
    context,
  })

  return steps.connect<PropTypes>(state, send, normalizeProps)
}
