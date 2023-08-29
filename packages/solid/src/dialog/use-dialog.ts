import * as dialog from '@zag-js/dialog'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseDialogProps = Optional<dialog.Context, 'id'>
export type UseDialogReturn = Accessor<dialog.Api<PropTypes>>

export const useDialog = (props: UseDialogProps): UseDialogReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(dialog.machine(context), { context })

  return createMemo(() => dialog.connect(state, send, normalizeProps))
}
