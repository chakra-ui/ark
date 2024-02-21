import { createSplitProps } from '../create-split-props'
import type { UseCollapsibleProps } from './use-collapsible'

export function splitCollapsibleProps<T>(props: T & UseCollapsibleProps) {
  return createSplitProps<UseCollapsibleProps>()(props, [
    'defaultOpen',
    'dir',
    'disabled',
    'getRootNode',
    'id',
    'ids',
    'lazyMount',
    'onOpenChange',
    'open',
    'unmountOnExit',
  ])
}
