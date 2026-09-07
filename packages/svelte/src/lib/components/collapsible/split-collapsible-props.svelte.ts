import type { Optional } from '$lib/types'
import { createSplitProps } from '$lib/utils/create-split-props'
import type { UseCollapsibleProps } from './use-collapsible.svelte.ts'

const splitFn = createSplitProps<Optional<UseCollapsibleProps, 'id'>>()

export const splitCollapsibleProps = <T extends Optional<UseCollapsibleProps, 'id'>>(props: T) =>
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
