import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as timer from '@zag-js/timer'
import { useId } from 'react'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTimerProps extends Optional<Omit<timer.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseTimerReturn extends timer.Api<PropTypes> {}

export const useTimer = (props: UseTimerProps = {}): UseTimerReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()

  const machineProps: timer.Props = {
    id,
    getRootNode,
    ...props,
  }

  const service = useMachine(timer.machine, machineProps)

  return timer.connect(service, normalizeProps)
}
