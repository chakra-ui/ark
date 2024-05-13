import * as dialog from '@zag-js/dialog'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseDialogProps
  extends Optional<Omit<dialog.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'> {
  /**
   * The initial open state of the dialog when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: dialog.Context['open']
}
export interface UseDialogReturn extends Accessor<dialog.Api<PropTypes>> {}

export const useDialog = (props: UseDialogProps): UseDialogReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    open: props.defaultOpen,
    'open.controlled': props.open !== undefined,
    ...props,
  }))
  const [state, send] = useMachine(dialog.machine(context()), { context })

  return createMemo(() => dialog.connect(state, send, normalizeProps))
}
