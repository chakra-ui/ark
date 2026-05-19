import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkJsonTreeViewRoot, ArkJsonTreeViewTree } from '../public-api'
import { jsonTreeViewExampleStyles } from '../json-tree-view-example-styles'

@Component({
  selector: 'json-tree-view-render-value-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkJsonTreeViewRoot, ArkJsonTreeViewTree],
  template: `
    <div arkJsonTreeView [data]="data" [defaultExpandedDepth]="1">
      <div arkJsonTreeViewTree [renderValue]="renderValue"></div>
    </div>

    <ng-template #renderValue let-node>
      @if (isEmail(node.value)) {
        <a [href]="'mailto:' + stripQuotes(node.value)">{{ node.value }}</a>
      } @else {
        {{ node.value }}
      }
    </ng-template>
  `,
  styles: [jsonTreeViewExampleStyles],
})
export class JsonTreeViewRenderValueExample {
  readonly data = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    website: 'https://ark-ui.com',
  }

  isEmail(value: unknown): boolean {
    return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.stripQuotes(value))
  }

  stripQuotes(value: string): string {
    return value.replace(/^"(.*)"$/, '$1')
  }
}
