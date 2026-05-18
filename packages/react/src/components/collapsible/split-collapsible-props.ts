'use client'

import { createSplitProps } from '../../utils/create-split-props.ts'
import type { UseCollapsibleProps } from './use-collapsible.ts'

export const splitCollapsibleProps = <T extends UseCollapsibleProps>(props: T) =>
  createSplitProps<UseCollapsibleProps>()(props, [
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
