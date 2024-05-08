import * as clipboard from '@zag-js/clipboard'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseClipboardProps
  extends Optional<Omit<clipboard.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseClipboardReturn extends Accessor<clipboard.Api<PropTypes>> {}

export const useClipboard = (props: UseClipboardProps): UseClipboardReturn => {
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    getRootNode: environment().getRootNode,
    ...props,
  }))
  const [state, send] = useMachine(clipboard.machine(context()), { context })

  return createMemo(() => clipboard.connect(state, send, normalizeProps))
}
