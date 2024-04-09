import * as dialog from '@zag-js/dialog'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseDialogProps extends Omit<Optional<dialog.Context, 'id'>, 'open.controlled'> {
  /**
   * The initial open state of the dialog.
   */
  defaultOpen?: dialog.Context['open']
}

export interface UseDialogReturn extends dialog.Api<PropTypes> {}

export const useDialog = (props: UseDialogProps = {}): UseDialogReturn => {
  const initialContext: dialog.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    open: props.defaultOpen ?? props.open,
    'open.controlled': props.open !== undefined,
  }

  const context: dialog.Context = {
    ...initialContext,
    open: props.open,
    onOpenChange: useEvent(props.onOpenChange, { sync: true }),
    onEscapeKeyDown: useEvent(props.onEscapeKeyDown),
    onInteractOutside: useEvent(props.onInteractOutside),
  }

  const [state, send] = useMachine(dialog.machine(initialContext), { context })
  return dialog.connect(state, send, normalizeProps)
}
