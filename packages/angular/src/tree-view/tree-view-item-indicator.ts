import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import type { TreeNode } from '@ark-ui/angular/collection'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { createTreeViewNodePropsResolver } from './tree-view-node-props'
import { injectArkTreeViewContext } from './use-tree-view-context'

@Directive({
  selector: '[arkTreeViewItemIndicator]',
  standalone: true,
  exportAs: 'arkTreeViewItemIndicator',
})
export class ArkTreeViewItemIndicator<T extends TreeNode = TreeNode> {
  /** The tree node. Required when not rendered under arkTreeViewNodeProvider. */
  readonly node: InputSignal<T | undefined> = input<T | undefined>(undefined)
  /** The index path of the tree node. Required when not rendered under arkTreeViewNodeProvider. */
  readonly indexPath: InputSignal<number[] | undefined> = input<number[] | undefined>(undefined)

  constructor() {
    const context = injectArkTreeViewContext<T>()
    const nodeProps = createTreeViewNodePropsResolver('ArkTreeViewItemIndicator', this.node, this.indexPath)
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemIndicatorProps(nodeProps()),
    })
  }
}
