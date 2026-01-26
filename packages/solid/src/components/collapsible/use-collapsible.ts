import * as collapsible from '@zag-js/collapsible'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createEffect, createMemo, createSignal, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { type RenderStrategyProps, splitRenderStrategyProps } from '../../utils/render-strategy'
import { runIfFn } from '../../utils/run-if-fn'

export interface UseCollapsibleProps
  extends Optional<Omit<collapsible.Props, 'dir' | 'getRootNode'>, 'id'>, RenderStrategyProps {}

export interface UseCollapsibleReturn extends Accessor<
  collapsible.Api<PropTypes> & {
    /**
     * Whether the content is unmounted
     */
    unmounted?: boolean
  }
> {}

export const useCollapsible = (props: MaybeAccessor<UseCollapsibleProps> = {}): UseCollapsibleReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const [renderStrategyProps, collapsibleProps] = splitRenderStrategyProps(runIfFn(props))

  const machineProps = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...collapsibleProps,
  }))

  const service = useMachine(collapsible.machine, machineProps)
  const [wasVisible, setWasVisible] = createSignal(false)

  createEffect(() => {
    const isPresent = api().visible
    if (isPresent) setWasVisible(true)
  })

  const api = createMemo(() => collapsible.connect(service, normalizeProps))

  return createMemo(() => ({
    ...api(),
    unmounted:
      (!api().visible && !wasVisible() && renderStrategyProps.lazyMount) ||
      (renderStrategyProps.unmountOnExit && !api().visible && wasVisible()),
  }))
}
