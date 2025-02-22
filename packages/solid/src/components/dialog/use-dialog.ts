import * as dialog from '@zag-js/dialog'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseDialogProps extends Optional<Omit<dialog.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseDialogReturn extends Accessor<dialog.Api<PropTypes>> {}

export const useDialog = (props: UseDialogProps = {}): UseDialogReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo<dialog.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props,
  }))

  const service = useMachine(dialog.machine, machineProps)
  return createMemo(() => dialog.connect(service, normalizeProps))
}
