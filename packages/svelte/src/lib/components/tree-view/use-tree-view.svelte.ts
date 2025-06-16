import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import * as treeView from '@zag-js/tree-view'
import { type MaybeFunction, ensureProps, runIfFn } from '@zag-js/utils'
import type { TreeNode } from '../collection'

export interface UseTreeViewProps<T extends TreeNode>
  extends Optional<Omit<treeView.Props<T>, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseTreeViewReturn<T extends TreeNode> extends Accessor<treeView.Api<PropTypes, T>> {}

export const useTreeView = <T extends TreeNode>(props: MaybeFunction<UseTreeViewProps<T>>): UseTreeViewReturn<T> => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    ensureProps(resolvedProps, ['id'])
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(treeView.machine, () => machineProps)

  const api = $derived(treeView.connect(service, normalizeProps))

  return () => api
}
