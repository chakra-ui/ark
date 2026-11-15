'use client'

import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as toggle from '@zag-js/toggle'
import { useId } from 'react'
import { useEnvironmentContext } from '../../providers/index.ts'
import type { Optional } from '../../types.ts'

export interface UseToggleProps extends Optional<Omit<toggle.Props, 'getRootNode'>, 'id'> {}

export interface UseToggleReturn extends toggle.Api<PropTypes> {}

export function useToggle(props?: UseToggleProps): UseToggleReturn {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()

  const machineProps: toggle.Props = {
    id,
    getRootNode,
    ...props,
  }

  const service = useMachine(toggle.machine, machineProps)
  return toggle.connect(service, normalizeProps)
}
