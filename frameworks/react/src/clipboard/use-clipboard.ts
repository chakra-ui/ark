import * as clipboard from '@zag-js/clipboard'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'

export interface UseClipboardProps extends Optional<clipboard.Context, 'id'> {}
export interface UseClipboardReturn extends clipboard.Api<PropTypes> {}

export const useClipboard = (props: UseClipboardProps) => {
  const initialContext: clipboard.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
  }

  const context: clipboard.Context = {
    ...initialContext,
  }

  const [state, send] = useMachine(clipboard.machine(initialContext), { context })

  return clipboard.connect(state, send, normalizeProps)
}
