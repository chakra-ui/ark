import { ChangeDetectionStrategy, Component, type TemplateRef, input, type InputSignal } from '@angular/core'
import type { JsonNode } from '@zag-js/json-tree-utils'
import { ArkTreeViewTree, injectArkTreeViewContext } from '@ark-ui/angular/tree-view'
import { ArkJsonTreeViewNode } from './json-tree-view-node'
import type { JsonTreeViewValueTemplate } from './json-tree-view.types'

@Component({
  selector: '[arkJsonTreeViewTree]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [ArkTreeViewTree],
  host: { 'data-scope': 'json-tree-view' },
  imports: [ArkJsonTreeViewNode],
  template: `
    @for (node of nodes(); track trackNode($index, node)) {
      <ark-json-tree-view-node
        [node]="node"
        [indexPath]="[$index]"
        [arrow]="arrow()"
        [indentGuide]="indentGuide()"
        [renderValue]="renderValue()"
      />
    }
  `,
})
export class ArkJsonTreeViewTree {
  /** Template for the branch arrow. */
  readonly arrow: InputSignal<TemplateRef<unknown> | null> = input<TemplateRef<unknown> | null>(null)
  /** Whether to render branch indent guides. */
  readonly indentGuide: InputSignal<boolean> = input(false)
  /** Template used to render text value nodes. */
  readonly renderValue: InputSignal<TemplateRef<JsonTreeViewValueTemplate> | null> =
    input<TemplateRef<JsonTreeViewValueTemplate> | null>(null)

  private readonly treeView = injectArkTreeViewContext<JsonNode>()

  nodes(): JsonNode[] {
    const collection = this.treeView.api().collection
    return collection.getNodeChildren(collection.rootNode)
  }

  trackNode(index: number, node: JsonNode): string {
    return `${index}:${node.keyPath.join('.')}`
  }
}
