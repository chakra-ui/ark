import * as clipboard from '@zag-js/clipboard'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'

export interface UseClipboardProps extends Optional<Omit<clipboard.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseClipboardReturn extends Accessor<clipboard.Api<PropTypes>> {}

export const useClipboard = (props?: MaybeAccessor<UseClipboardProps>): UseClipboardReturn => {
  const id = createUniqueId()
  const environment = useEnvironmentContext()

  const machineProps = createMemo<clipboard.Props>(() => ({
    id,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(clipboard.machine, machineProps)
  return createMemo(() => clipboard.connect(service, normalizeProps))
}
