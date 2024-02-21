import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { CollapsibleProvider } from './collapsible-context'
import { useCollapsible, type UseCollapsibleProps } from './use-collapsible'

export interface CollapsibleRootProps extends Assign<HTMLArkProps<'div'>, UseCollapsibleProps> {}

export const CollapsibleRoot: ArkComponent<'div', UseCollapsibleProps> = (
  props: CollapsibleRootProps,
) => {
  const [params, localProps] = createSplitProps<UseCollapsibleProps>()(props, [
    'dir',
    'disabled',
    'getRootNode',
    'id',
    'ids',
    'onOpenChange',
    'open',
  ])

  const api = useCollapsible(params)
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <CollapsibleProvider value={api}>
      <ark.div {...mergedProps} />
    </CollapsibleProvider>
  )
}
