import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, type TemplateRef, input, type InputSignal } from '@angular/core'
import { type JsonNode, getAccessibleDescription, jsonNodeToElement, keyPathToKey } from '@zag-js/json-tree-utils'
import {
  ArkTreeViewBranch,
  ArkTreeViewBranchContent,
  ArkTreeViewBranchControl,
  ArkTreeViewBranchIndentGuide,
  ArkTreeViewBranchIndicator,
  ArkTreeViewBranchText,
  ArkTreeViewItem,
  ArkTreeViewItemText,
  ArkTreeViewNodeProvider,
  injectArkTreeViewContext,
} from '@ark-ui/angular/src/tree-view'
import { ArkJsonTreeViewKeyNode } from './json-tree-view-key-node'
import type { JsonTreeViewValueTemplate } from './json-tree-view.types'
import { ArkJsonTreeViewValueNode } from './json-tree-view-value-node'
import { injectArkJsonTreeViewOptions } from './use-json-tree-view-context'

@Component({
  selector: 'ark-json-tree-view-node',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    ArkTreeViewNodeProvider,
    ArkTreeViewBranch,
    ArkTreeViewBranchControl,
    ArkTreeViewBranchIndicator,
    ArkTreeViewBranchText,
    ArkTreeViewBranchContent,
    ArkTreeViewBranchIndentGuide,
    ArkTreeViewItem,
    ArkTreeViewItemText,
    ArkJsonTreeViewKeyNode,
    ArkJsonTreeViewValueNode,
  ],
  template: `
    <ng-container *ngTemplateOutlet="renderNode; context: { $implicit: node(), indexPath: indexPath() }" />

    <ng-template #renderNode let-current let-currentIndexPath="indexPath">
      <ng-container arkTreeViewNodeProvider [node]="current" [indexPath]="currentIndexPath">
        @if (isBranch(current, currentIndexPath)) {
          <div arkTreeViewBranch data-scope="json-tree-view">
            <div
              arkTreeViewBranchControl
              data-scope="json-tree-view"
              [attr.aria-label]="description(current)"
              [attr.data-line]="line(currentIndexPath)"
              [style.--line-length]="lineLength(currentIndexPath)"
            >
              <span arkTreeViewBranchIndicator data-scope="json-tree-view">
                @if (arrow(); as arrowTemplate) {
                  <ng-container *ngTemplateOutlet="arrowTemplate" />
                } @else {
                  <span aria-hidden="true">›</span>
                }
              </span>
              <span arkTreeViewBranchText data-scope="json-tree-view">
                @if (key(current)) {
                  <ark-json-tree-view-key-node [node]="current" />
                }
                <ark-json-tree-view-value-node [node]="valueNode(current)" [renderValue]="renderValue()" />
              </span>
            </div>
            <div arkTreeViewBranchContent data-scope="json-tree-view">
              @if (indentGuide()) {
                <span arkTreeViewBranchIndentGuide></span>
              }
              @for (child of children(current); track trackNode($index, child)) {
                <ng-container
                  *ngTemplateOutlet="
                    renderNode;
                    context: { $implicit: child, indexPath: childIndexPath(currentIndexPath, $index) }
                  "
                />
              }
            </div>
          </div>
        } @else {
          <div
            arkTreeViewItem
            data-scope="json-tree-view"
            [attr.aria-label]="description(current)"
            [attr.data-line]="line(currentIndexPath)"
            [style.--line-length]="lineLength(currentIndexPath)"
          >
            <span arkTreeViewItemText data-scope="json-tree-view">
              @if (key(current)) {
                <ark-json-tree-view-key-node [node]="current" />
              }
              <ark-json-tree-view-value-node [node]="valueNode(current)" [renderValue]="renderValue()" />
            </span>
          </div>
        }
      </ng-container>
    </ng-template>
  `,
})
export class ArkJsonTreeViewNode {
  /** The node to render. */
  readonly node: InputSignal<JsonNode> = input.required<JsonNode>()
  /** The index path of the node. */
  readonly indexPath: InputSignal<number[]> = input.required<number[]>()
  /** Template for the branch arrow. */
  readonly arrow: InputSignal<TemplateRef<unknown> | null> = input<TemplateRef<unknown> | null>(null)
  /** Whether to render branch indent guides. */
  readonly indentGuide: InputSignal<boolean> = input(false)
  /** Template used to render text value nodes. */
  readonly renderValue: InputSignal<TemplateRef<JsonTreeViewValueTemplate> | null> =
    input<TemplateRef<JsonTreeViewValueTemplate> | null>(null)

  private readonly treeView = injectArkTreeViewContext<JsonNode>()
  private readonly options = injectArkJsonTreeViewOptions()

  valueNode(node: JsonNode) {
    return jsonNodeToElement(node, this.options())
  }

  isBranch(node: JsonNode, indexPath: number[]): boolean {
    return this.treeView.api().getNodeState({ node, indexPath }).isBranch
  }

  children(node: JsonNode): JsonNode[] {
    return node.children ?? []
  }

  key(node: JsonNode): string {
    return keyPathToKey(node.keyPath, { excludeRoot: true })
  }

  description(node: JsonNode): string {
    return getAccessibleDescription(node)
  }

  line(indexPath: number[]): number {
    return indexPath.reduce((acc, current) => acc + current, 1)
  }

  lineLength(indexPath: number[]): number {
    return indexPath.length - 1
  }

  childIndexPath(indexPath: number[], index: number): number[] {
    return [...indexPath, index]
  }

  trackNode(index: number, node: JsonNode): string {
    return `${index}:${node.keyPath.join('.')}`
  }
}
