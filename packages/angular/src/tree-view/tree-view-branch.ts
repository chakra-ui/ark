import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import type { TreeNode } from '@ark-ui/angular/src/collection'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { createTreeViewNodePropsResolver } from './tree-view-node-props'
import { injectArkTreeViewContext } from './use-tree-view-context'

@Directive({
  selector: '[arkTreeViewBranch]',
  standalone: true,
  exportAs: 'arkTreeViewBranch',
})
export class ArkTreeViewBranch<T extends TreeNode = TreeNode> {
  /** The tree node. Required when not rendered under arkTreeViewNodeProvider. */
  readonly node: InputSignal<T | undefined> = input<T | undefined>(undefined)
  /** The index path of the tree node. Required when not rendered under arkTreeViewNodeProvider. */
  readonly indexPath: InputSignal<number[] | undefined> = input<number[] | undefined>(undefined)

  constructor() {
    const context = injectArkTreeViewContext<T>()
    const nodeProps = createTreeViewNodePropsResolver('ArkTreeViewBranch', this.node, this.indexPath)
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getBranchProps(nodeProps()),
    })
  }
}
