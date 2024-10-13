import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as tooltip from '@zag-js/tooltip'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTooltipProps
  extends Optional<Omit<tooltip.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'> {
  /**
   * The initial open state of the tooltip when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: tooltip.Context['open']
}
export interface UseTooltipReturn extends Accessor<tooltip.Api<PropTypes>> {}

export const useTooltip = (props: UseTooltipProps = {}): UseTooltipReturn => {
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

  const [state, send] = useMachine(tooltip.machine(context()), { context })
  return createMemo(() => tooltip.connect(state, send, normalizeProps))
}
