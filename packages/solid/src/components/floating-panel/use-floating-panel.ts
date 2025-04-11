import * as floatingPanel from '@zag-js/floating-panel'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'

export interface UseFloatingPanelProps extends Optional<Omit<floatingPanel.Props, 'getRootNode'>, 'id'> {}

export interface UseFloatingPanelReturn extends Accessor<floatingPanel.Api<PropTypes>> {}

export const useFloatingPanel = (props: MaybeAccessor<UseFloatingPanelProps> = {}): UseFloatingPanelReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()
  const id = createUniqueId()

  const machineProps = createMemo<floatingPanel.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: env().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(floatingPanel.machine, machineProps)

  return createMemo(() => floatingPanel.connect(service, normalizeProps))
}
