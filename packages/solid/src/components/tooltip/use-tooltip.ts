import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as tooltip from '@zag-js/tooltip'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'

export interface UseTooltipProps extends Optional<Omit<tooltip.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTooltipReturn extends Accessor<tooltip.Api<PropTypes>> {}

export const useTooltip = (props?: MaybeAccessor<UseTooltipProps>): UseTooltipReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo<tooltip.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(tooltip.machine, machineProps)
  return createMemo(() => tooltip.connect(service, normalizeProps))
}
