import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UseCollapsibleProps, useCollapsible } from './use-collapsible'
import { CollapsibleProvider } from './use-collapsible-context'

export interface CollapsibleRootProps extends Assign<HTMLArkProps<'div'>, UseCollapsibleProps> {}

export const CollapsibleRoot = (props: CollapsibleRootProps) => {
  const [useCollapsibleProps, localProps] = createSplitProps<UseCollapsibleProps>()(props, [
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
