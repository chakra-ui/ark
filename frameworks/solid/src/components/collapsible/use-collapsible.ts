import * as collapsible from '@zag-js/collapsible'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createEffect, createMemo, createSignal, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { type RenderStrategyProps, splitRenderStrategyProps } from '../../utils/render-strategy'

export interface UseCollapsibleProps
  extends Optional<Omit<collapsible.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'>,
    RenderStrategyProps {}

export interface UseCollapsibleReturn
  extends Accessor<
    collapsible.Api<PropTypes> & {
      /**
       * Whether the content is unmounted
       */
      unmounted?: boolean
    }
  > {}

export const useCollapsible = (props: UseCollapsibleProps): UseCollapsibleReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const [renderStrategyProps, collapsibleProps] = splitRenderStrategyProps(props)
  const context = mergeProps(
    {
      id: createUniqueId(),
      dir: locale().dir,
      getRootNode: environment().getRootNode,
      'open.controlled': props.open !== undefined,
    },
    collapsibleProps,
  )
  const [state, send] = useMachine(collapsible.machine(context), { context })
  const [wasVisible, setWasVisible] = createSignal(false)

  createEffect(() => {
    const isPresent = api().visible
    if (isPresent) setWasVisible(true)
  })

  const api = createMemo(() => collapsible.connect(state, send, normalizeProps))

  return createMemo(() => ({
    ...api(),
    unmounted:
      (!api().visible && !wasVisible() && renderStrategyProps.lazyMount) ||
      (renderStrategyProps.unmountOnExit && !api().visible && wasVisible()),
  }))
}
