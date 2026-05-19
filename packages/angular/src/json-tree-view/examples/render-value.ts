import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkJsonTreeViewRoot, ArkJsonTreeViewTree } from '../public-api'
import { jsonTreeViewExampleStyles } from '../json-tree-view-example-styles'

@Component({
  selector: 'json-tree-view-render-value-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkJsonTreeViewRoot, ArkJsonTreeViewTree],
  template: `
    <div arkJsonTreeView [data]="data" [defaultExpandedDepth]="2">
      <div arkJsonTreeViewTree [arrow]="arrow" [renderValue]="renderValue"></div>
    </div>

    <ng-template #arrow>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </ng-template>

    <ng-template #renderValue let-node>
      @if (isEmail(node.value)) {
        <a [href]="'mailto:' + stripQuotes(node.value)" target="_blank" rel="noreferrer">{{ node.value }}</a>
      }
    </ng-template>
  `,
  styles: [jsonTreeViewExampleStyles],
})
export class JsonTreeViewRenderValueExample {
  readonly data = {
    name: 'John Doe',
    age: 30,
    number: Number.NaN,
    email: 'john.doe@example.com',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    },
  }

  isEmail(value: unknown): boolean {
    return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.stripQuotes(value))
  }

  stripQuotes(value: string): string {
    return value.replace(/^"(.*)"$/, '$1')
  }
}
