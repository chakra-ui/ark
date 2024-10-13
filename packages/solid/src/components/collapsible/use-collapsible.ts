import * as collapsible from '@zag-js/collapsible'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createEffect, createMemo, createSignal, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { type RenderStrategyProps, splitRenderStrategyProps } from '../../utils/render-strategy'

export interface UseCollapsibleProps
  extends Optional<Omit<collapsible.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'>,
    RenderStrategyProps {
  /**
   * The initial open state of the collapsible when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: collapsible.Context['open']
}

export interface UseCollapsibleReturn
  extends Accessor<
    collapsible.Api<PropTypes> & {
      /**
       * Whether the content is unmounted
       */
      unmounted?: boolean
    }
  > {}

export const useCollapsible = (props: UseCollapsibleProps = {}): UseCollapsibleReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const [renderStrategyProps, collapsibleProps] = splitRenderStrategyProps(props)
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    open: props.defaultOpen,
    'open.controlled': props.open !== undefined,
    ...collapsibleProps,
  }))
  const [state, send] = useMachine(collapsible.machine(context()), { context })
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
