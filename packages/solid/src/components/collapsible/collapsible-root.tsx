import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type EmptyState, type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseCollapsibleProps, useCollapsible } from './use-collapsible.ts'
import { CollapsibleProvider } from './use-collapsible-context.ts'

export interface CollapsibleRootBaseProps<State = EmptyState>
  extends UseCollapsibleProps, PolymorphicProps<'div', State> {
  /**
   * @internal Set by a composing part such as `Accordion.Item`; the collapsible machine has no root state of its own.
   */
  state?: State
}
export interface CollapsibleRootProps<State = EmptyState> extends HTMLProps<'div'>, CollapsibleRootBaseProps<State> {}

export const CollapsibleRoot = <State = EmptyState,>(props: CollapsibleRootProps<State>) => {
  const [useCollapsibleProps, localProps] = createSplitProps<UseCollapsibleProps>()(props, [
    'collapsedHeight',
    'collapsedWidth',
    'defaultOpen',
    'disabled',
    'id',
    'ids',
    'lazyMount',
    'onExitComplete',
    'onOpenChange',
    'open',
    'unmountOnExit',
  ])

  const api = useCollapsible(useCollapsibleProps)
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <CollapsibleProvider value={api}>
      <ark.div {...mergedProps} />
    </CollapsibleProvider>
  )
}
