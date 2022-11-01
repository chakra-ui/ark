import * as dialog from '@zag-js/dialog'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UseDialogProps = Omit<dialog.Context, 'id'>

export const useDialog = (props: UseDialogProps) => {
  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...props,
  })

  const [state, send] = useMachine(dialog.machine(initialContext), { context: initialContext })
  return dialog.connect(state, send, normalizeProps)
}

export type UseDialogReturn = ReturnType<typeof useDialog>
