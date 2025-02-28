import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as steps from '@zag-js/steps'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseStepsProps extends Optional<Omit<steps.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseStepsReturn extends steps.Api<PropTypes> {}

export function useSteps(props: UseStepsProps = {}): UseStepsReturn {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps: steps.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(steps.machine, machineProps)
  return steps.connect<PropTypes>(service, normalizeProps)
}
