import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useCollapsible, type UseCollapsibleProps } from './use-collapsible'
import { CollapsibleProvider } from './use-collapsible-context'

export interface CollapsibleRootProps extends Assign<HTMLArkProps<'div'>, UseCollapsibleProps> {}

export const CollapsibleRoot = (props: CollapsibleRootProps) => {
  const [params, localProps] = createSplitProps<UseCollapsibleProps>()(props, [
    'dir',
    'disabled',
    'getRootNode',
    'id',
    'ids',
    'lazyMount',
    'onExitComplete',
    'onOpenChange',
    'open',
    'unmountOnExit',
  ])

  const api = useCollapsible(params)
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <CollapsibleProvider value={api}>
      <ark.div {...mergedProps()} />
    </CollapsibleProvider>
  )
}
