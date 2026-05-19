import { Directive, HostBinding, computed, inject, input, type InputSignal, type Signal } from '@angular/core'
import type { TreeNode } from '@ark-ui/angular/collection'
import type { TreeViewCheckedState } from './tree-view.types'
import { createTreeViewNodePropsResolver } from './tree-view-node-props'
import { injectArkTreeViewContext } from './use-tree-view-context'

type TreeViewNodeCheckboxIndicatorState = 'checked' | 'unchecked' | 'indeterminate'

@Directive({
  selector: '[arkTreeViewNodeCheckboxIndicator]',
  standalone: true,
  exportAs: 'arkTreeViewNodeCheckboxIndicator',
})
export class ArkTreeViewNodeCheckboxIndicator<T extends TreeNode = TreeNode> {
  /** The tree node. Required when not rendered under arkTreeViewNodeProvider. */
  readonly node: InputSignal<T | undefined> = input<T | undefined>(undefined)
  /** The index path of the tree node. Required when not rendered under arkTreeViewNodeProvider. */
  readonly indexPath: InputSignal<number[] | undefined> = input<number[] | undefined>(undefined)
  /** Optional state filter that hides the host when the node is in a different checked state. */
  readonly state: InputSignal<TreeViewNodeCheckboxIndicatorState | undefined> = input<
    TreeViewNodeCheckboxIndicatorState | undefined
  >(undefined)

  private readonly context = injectArkTreeViewContext<T>()
  private readonly nodeProps = createTreeViewNodePropsResolver(
    'ArkTreeViewNodeCheckboxIndicator',
    this.node,
    this.indexPath,
  )
  readonly checked: Signal<TreeViewCheckedState> = computed(
    () => this.context.api().getNodeState(this.nodeProps()).checked,
  )
  readonly dataState: Signal<TreeViewNodeCheckboxIndicatorState> = computed(() => {
    const checked = this.checked()
    if (checked === 'indeterminate') return 'indeterminate'
    return checked ? 'checked' : 'unchecked'
  })

  @HostBinding('attr.data-state')
  protected get hostDataState(): TreeViewNodeCheckboxIndicatorState {
    return this.dataState()
  }

  @HostBinding('attr.aria-hidden')
  protected readonly ariaHidden = 'true'

  @HostBinding('hidden')
  protected get hidden(): boolean {
    const state = this.state()
    return state !== undefined && this.dataState() !== state
  }
}
