import * as dialog from '@zag-js/dialog'
import { mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseDialogProps = Optional<dialog.Context, 'id'>

export const useDialog = (props: UseDialogProps) => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)

  const [state, send] = useMachine(dialog.machine(context), { context })

  return createMemo(() => dialog.connect(state, send, normalizeProps))
}

export type UseDialogReturn = ReturnType<typeof useDialog>
