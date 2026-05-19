import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkJsonTreeViewRoot, ArkJsonTreeViewTree } from '../public-api'
import { jsonTreeViewExampleStyles } from '../json-tree-view-example-styles'

@Component({
  selector: 'json-tree-view-regex-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkJsonTreeViewRoot, ArkJsonTreeViewTree],
  template: `
    <div arkJsonTreeView [data]="data" [defaultExpandedDepth]="1">
      <div arkJsonTreeViewTree [arrow]="arrow"></div>
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
  `,
  styles: [jsonTreeViewExampleStyles],
})
export class JsonTreeViewRegexExample {
  readonly data = {
    regex: /^[a-z0-9]+/g,
    case_insensitive: /^(?:[a-z0-9]+)foo.*?/i,
  }
}
