import { createSplitProps } from '../../utils/create-split-props'
import type { UseCollapsibleProps } from './use-collapsible'

export const splitCollapsibleProps = <T extends UseCollapsibleProps>(props: T) =>
  createSplitProps<UseCollapsibleProps>()(props, [
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
