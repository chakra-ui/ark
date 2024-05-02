import * as dialog from '@zag-js/dialog'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseDialogProps
  extends Optional<Omit<dialog.Context, 'getRootNode' | 'dir' | 'open.controlled'>, 'id'> {
  /**
   * The initial open state of the dialog when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: dialog.Context['open']
}

export interface UseDialogReturn extends dialog.Api<PropTypes> {}

export const useDialog = (props: UseDialogProps = {}): UseDialogReturn => {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const initialContext: dialog.Context = {
    id: useId(),
    getRootNode,
    dir,
    ...props,
    open: props.open ?? props.defaultOpen,
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
