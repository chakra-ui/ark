import { InjectionToken, type Signal, inject } from '@angular/core'
import type { TreeNode } from '@ark-ui/angular/collection'
import type { TreeViewNodeProps, TreeViewNodeState } from './tree-view.types'
import type { UseTreeViewReturn } from './use-tree-view'

export const ARK_TREE_VIEW_CONTEXT = new InjectionToken<UseTreeViewReturn>('ARK_TREE_VIEW_CONTEXT')

export function injectArkTreeViewContext<T extends TreeNode = TreeNode>(): UseTreeViewReturn<T> {
  return inject(ARK_TREE_VIEW_CONTEXT) as UseTreeViewReturn<T>
}

export type UseTreeViewNodeContext = Signal<TreeViewNodeState>
export type UseTreeViewNodePropsContext<T extends TreeNode = TreeNode> = Signal<TreeViewNodeProps & { node: T }>

export const ARK_TREE_VIEW_NODE_CONTEXT = new InjectionToken<UseTreeViewNodeContext>('ARK_TREE_VIEW_NODE_CONTEXT')

export function injectArkTreeViewNodeContext(): UseTreeViewNodeContext {
  return inject(ARK_TREE_VIEW_NODE_CONTEXT)
}

export const ARK_TREE_VIEW_NODE_PROPS_CONTEXT = new InjectionToken<UseTreeViewNodePropsContext>(
  'ARK_TREE_VIEW_NODE_PROPS_CONTEXT',
)

export function injectArkTreeViewNodePropsContext<T extends TreeNode = TreeNode>(): UseTreeViewNodePropsContext<T> {
  return inject(ARK_TREE_VIEW_NODE_PROPS_CONTEXT) as UseTreeViewNodePropsContext<T>
}
