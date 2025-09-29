import { createSplitProps } from '$lib/utils/create-split-props'
import type { UseCollapsibleProps } from './use-collapsible.svelte'

const splitFn = createSplitProps<UseCollapsibleProps>()

export const splitCollapsibleProps = <T extends UseCollapsibleProps>(props: T) =>
  splitFn(props, [
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
