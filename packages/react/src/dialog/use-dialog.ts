import * as dialog from '@zag-js/dialog'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UseDialogProps extends Optional<dialog.Context, 'id'> {}
export type UseDialogReturn = dialog.Api

export const useDialog = (props: UseDialogProps): UseDialogReturn => {
  const getRootNode = useEnvironmentContext()
  const context = {
    id: useId(),
    getRootNode,
    ...props,
  }

  const [state, send] = useMachine(dialog.machine(context), { context })
  return dialog.connect(state, send, normalizeProps)
}
