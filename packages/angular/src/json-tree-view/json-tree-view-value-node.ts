import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, type TemplateRef, input, type InputSignal } from '@angular/core'
import type { JsonNodeElement, JsonNodeHastElement, JsonNodeText } from '@zag-js/json-tree-utils'
import type { JsonTreeViewValueTemplate } from './json-tree-view.types'

@Component({
  selector: 'ark-json-tree-view-value-node',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  template: `
    <ng-container *ngTemplateOutlet="renderNode; context: { $implicit: node() }" />

    <ng-template #renderNode let-current>
      @if (isText(current)) {
        @if (renderValue(); as template) {
          <ng-container *ngTemplateOutlet="template; context: { $implicit: current, node: current, text: current }" />
        } @else {
          {{ current.value }}
        }
      } @else {
        @switch (current.tagName) {
          @case ('a') {
            <a
              [attr.href]="element(current).properties['href'] ?? null"
              [attr.target]="element(current).properties['target'] ?? null"
              [attr.rel]="element(current).properties['rel'] ?? null"
              [attr.data-root]="element(current).properties.root ? '' : null"
              [attr.data-type]="element(current).properties.nodeType ?? null"
              [attr.data-kind]="element(current).properties.kind ?? null"
            >
              <ng-container *ngTemplateOutlet="children; context: { $implicit: element(current) }" />
            </a>
          }
          @case ('div') {
            <div
              [attr.data-root]="element(current).properties.root ? '' : null"
              [attr.data-type]="element(current).properties.nodeType ?? null"
              [attr.data-kind]="element(current).properties.kind ?? null"
            >
              <ng-container *ngTemplateOutlet="children; context: { $implicit: element(current) }" />
            </div>
          }
          @default {
            <span
              [attr.data-root]="element(current).properties.root ? '' : null"
              [attr.data-type]="element(current).properties.nodeType ?? null"
              [attr.data-kind]="element(current).properties.kind ?? null"
            >
              <ng-container *ngTemplateOutlet="children; context: { $implicit: element(current) }" />
            </span>
          }
        }
      }
    </ng-template>

    <ng-template #children let-current>
      @for (child of current.children; track $index) {
        <ng-container *ngTemplateOutlet="renderNode; context: { $implicit: child }" />
      }
    </ng-template>
  `,
})
export class ArkJsonTreeViewValueNode {
  /** The value node to render. */
  readonly node: InputSignal<JsonNodeHastElement> = input.required<JsonNodeHastElement>()
  /** Template used to render text nodes. */
  readonly renderValue: InputSignal<TemplateRef<JsonTreeViewValueTemplate> | null> =
    input<TemplateRef<JsonTreeViewValueTemplate> | null>(null)

  isText(node: JsonNodeHastElement): node is JsonNodeText {
    return node.type === 'text'
  }

  element(node: JsonNodeHastElement): JsonNodeElement {
    return node as JsonNodeElement
  }
}
