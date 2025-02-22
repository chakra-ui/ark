import * as progress from '@zag-js/progress'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseProgressProps extends Optional<Omit<progress.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseProgressReturn extends progress.Api<PropTypes> {}

export const useProgress = (props: UseProgressProps = {}): UseProgressReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const userProps: progress.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(progress.machine, userProps)
  return progress.connect(service, normalizeProps)
}
