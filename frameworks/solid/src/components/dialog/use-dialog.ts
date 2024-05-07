import * as dialog from '@zag-js/dialog'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseDialogProps
  extends Optional<Omit<dialog.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'> {}
export interface UseDialogReturn extends Accessor<dialog.Api<PropTypes>> {}

export const useDialog = (props: UseDialogProps): UseDialogReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const context = createMemo(() => ({
    id: createUniqueId(),
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    'open.controlled': props.open !== undefined,
    ...props,
  }))
  const [state, send] = useMachine(dialog.machine(context()), { context })

  return createMemo(() => dialog.connect(state, send, normalizeProps))
}
