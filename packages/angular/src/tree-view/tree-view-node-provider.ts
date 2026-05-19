import { Directive, computed, forwardRef, input, type InputSignal, type Signal } from '@angular/core'
import type { TreeNode } from '@ark-ui/angular/src/collection'
import type { TreeViewNodeProps, TreeViewNodeState } from './tree-view.types'
import {
  ARK_TREE_VIEW_NODE_CONTEXT,
  ARK_TREE_VIEW_NODE_PROPS_CONTEXT,
  injectArkTreeViewContext,
} from './use-tree-view-context'

@Directive({
  selector: '[arkTreeViewNodeProvider]',
  standalone: true,
  exportAs: 'arkTreeViewNodeProvider',
  providers: [
    {
      provide: ARK_TREE_VIEW_NODE_CONTEXT,
      useFactory: (provider: ArkTreeViewNodeProvider) => provider.nodeState,
      deps: [forwardRef(() => ArkTreeViewNodeProvider)],
    },
    {
      provide: ARK_TREE_VIEW_NODE_PROPS_CONTEXT,
      useFactory: (provider: ArkTreeViewNodeProvider) => provider.nodeProps,
      deps: [forwardRef(() => ArkTreeViewNodeProvider)],
    },
  ],
})
export class ArkTreeViewNodeProvider<T extends TreeNode = TreeNode> {
  /** The tree node. */
  readonly node: InputSignal<T> = input.required<T>()
  /** The index path of the tree node. */
  readonly indexPath: InputSignal<number[]> = input.required<number[]>()

  private readonly treeView = injectArkTreeViewContext<T>()
  readonly nodeProps: Signal<TreeViewNodeProps & { node: T }> = computed(() => ({
    node: this.node(),
    indexPath: this.indexPath(),
  }))
  readonly nodeState: Signal<TreeViewNodeState> = computed(() => this.treeView.api().getNodeState(this.nodeProps()))
}
