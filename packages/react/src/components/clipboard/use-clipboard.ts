import * as clipboard from '@zag-js/clipboard'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../../providers/environment'
import type { Optional } from '../../types'

export interface UseClipboardProps extends Optional<Omit<clipboard.Context, 'getRootNode'>, 'id'> {}
export interface UseClipboardReturn extends clipboard.Api<PropTypes> {}

export const useClipboard = (props: UseClipboardProps = {}) => {
  const { getRootNode } = useEnvironmentContext()

  const initialContext: clipboard.Context = {
    id: useId(),
    getRootNode,
    ...props,
  }

  const context: clipboard.Context = {
    ...initialContext,
  }

  const [state, send] = useMachine(clipboard.machine(initialContext), { context })

  return clipboard.connect(state, send, normalizeProps)
}
