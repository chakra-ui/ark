import * as dialog from '@zag-js/dialog'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseDialogProps extends Omit<Optional<dialog.Context, 'id'>, 'open.controlled'> {}
export interface UseDialogReturn extends Accessor<dialog.Api<PropTypes>> {}

export const useDialog = (props: UseDialogProps): UseDialogReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(dialog.machine(context), { context })

  return createMemo(() => dialog.connect(state, send, normalizeProps))
}
