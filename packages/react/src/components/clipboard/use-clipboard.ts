'use client'

import * as clipboard from '@zag-js/clipboard'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../../providers/environment/index.ts'
import type { Optional } from '../../types.ts'

export interface UseClipboardProps extends Optional<Omit<clipboard.Props, 'getRootNode'>, 'id'> {}
export interface UseClipboardReturn extends clipboard.Api<PropTypes> {}

export const useClipboard = (props?: UseClipboardProps): UseClipboardReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()

  const machineProps: clipboard.Props = {
    id,
    getRootNode,
    ...props,
  }

  const service = useMachine(clipboard.machine, machineProps)
  return clipboard.connect(service, normalizeProps)
}
