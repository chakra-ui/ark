import { type InputSignal, inject } from '@angular/core'
import type { TreeNode } from '@ark-ui/angular/src/collection'
import type { TreeViewNodeProps } from './tree-view.types'
import { ARK_TREE_VIEW_NODE_PROPS_CONTEXT, type UseTreeViewNodePropsContext } from './use-tree-view-context'

export type TreeViewResolvedNodeProps<T extends TreeNode = TreeNode> = TreeViewNodeProps & { node: T }

export function createTreeViewNodePropsResolver<T extends TreeNode>(
  partName: string,
  node: InputSignal<T | undefined>,
  indexPath: InputSignal<number[] | undefined>,
): () => TreeViewResolvedNodeProps<T> {
  const provider = inject(ARK_TREE_VIEW_NODE_PROPS_CONTEXT, { optional: true }) as UseTreeViewNodePropsContext<T> | null

  return () => {
    const explicitNode = node()
    const explicitIndexPath = indexPath()
    if (explicitNode !== undefined && explicitIndexPath !== undefined) {
      return { node: explicitNode, indexPath: explicitIndexPath }
    }
    if (explicitNode === undefined && explicitIndexPath === undefined && provider) {
      return provider()
    }
    throw new Error(`${partName} requires [node] and [indexPath] inputs or an ancestor [arkTreeViewNodeProvider].`)
  }
}
