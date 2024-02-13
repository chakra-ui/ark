import * as clipboard from '@zag-js/clipboard'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UseClipboardProps
  extends Omit<Optional<clipboard.Context, 'id'>, 'open.controlled'> {}

export type UseClipboardReturn = ReturnType<typeof clipboard.connect>

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
