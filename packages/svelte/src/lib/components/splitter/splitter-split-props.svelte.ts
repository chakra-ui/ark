import { createSplitProps } from '$lib/utils/create-split-props'
import type { UseSplitterProps } from './use-splitter.svelte'

export function splitSplitterProps<T extends UseSplitterProps>(props: T) {
  return createSplitProps<UseSplitterProps>()(props, [
    'defaultSize',
    'id',
    'ids',
    'keyboardResizeBy',
    'nonce',
    'onCollapse',
    'onExpand',
    'onResize',
    'onResizeEnd',
    'onResizeStart',
    'orientation',
    'panels',
    'size',
  ])
}
