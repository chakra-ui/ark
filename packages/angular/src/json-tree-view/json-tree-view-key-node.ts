import { ChangeDetectionStrategy, Component, computed, input, type InputSignal } from '@angular/core'
import { type JsonNode, keyPathToKey } from '@zag-js/json-tree-utils'
import { injectArkJsonTreeViewOptions } from './use-json-tree-view-context'

@Component({
  selector: 'ark-json-tree-view-key-node',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span data-kind="key" [attr.data-non-enumerable]="node().isNonEnumerable ? '' : null">{{ displayKey() }}</span>
    <span data-kind="colon">:</span>
  `,
})
export class ArkJsonTreeViewKeyNode {
  /** The node to render. */
  readonly node: InputSignal<JsonNode> = input.required<JsonNode>()

  private readonly options = injectArkJsonTreeViewOptions()

  readonly displayKey = computed(() => {
    const key = keyPathToKey(this.node().keyPath)
    return this.options().quotesOnKeys ? `"${key}"` : key
  })
}
