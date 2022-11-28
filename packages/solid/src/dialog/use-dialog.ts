import * as dialog from '@zag-js/dialog'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import type { Optional } from '../types'

export type UseDialogProps = Optional<dialog.Context, 'id'>

export const useDialog = (props: UseDialogProps) => {
  const context = {
    id: createUniqueId(),
    ...props,
  }

  const [state, send] = useMachine(dialog.machine(context), { context })
  return createMemo(() => dialog.connect(state, send, normalizeProps))
}

export type UseDialogReturn = ReturnType<typeof useDialog>
