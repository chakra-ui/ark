import * as clipboard from '@zag-js/clipboard'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'

export interface UseClipboardProps extends Optional<clipboard.Context, 'id'> {}
export interface UseClipboardReturn extends Accessor<clipboard.Api<PropTypes>> {}

export const useClipboard = (props: UseClipboardProps): UseClipboardReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(clipboard.machine(context), { context })

  return createMemo(() => clipboard.connect(state, send, normalizeProps))
}
