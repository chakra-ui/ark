import * as dialog from '@zag-js/dialog'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import type { Optional } from '../types'

export type UseDialogProps = Optional<dialog.Context, 'id'>

export const useDialog = (props: UseDialogProps) => {
  const context = {
    id: useId(),
    ...props,
  }

  const [state, send] = useMachine(dialog.machine(context), { context })
  return dialog.connect(state, send, normalizeProps)
}

export type UseDialogReturn = ReturnType<typeof useDialog>
