import type { Optional } from '$lib/types'
import { createSplitProps } from '$lib/utils/create-split-props'
import type { UseSplitterProps } from './use-splitter.svelte.ts'

export function splitSplitterProps<T extends Optional<UseSplitterProps, 'id'>>(props: T) {
  return createSplitProps<Optional<UseSplitterProps, 'id'>>()(props, [
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
    'registry',
    'size',
  ])
}
