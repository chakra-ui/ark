import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkJsonTreeViewRoot, ArkJsonTreeViewTree } from '../public-api'
import { jsonTreeViewExampleStyles } from '../json-tree-view-example-styles'

@Component({
  selector: 'json-tree-view-map-and-set-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkJsonTreeViewRoot, ArkJsonTreeViewTree],
  template: `
    <div arkJsonTreeView [data]="data" [defaultExpandedDepth]="1">
      <div arkJsonTreeViewTree></div>
    </div>
  `,
  styles: [jsonTreeViewExampleStyles],
})
export class JsonTreeViewMapAndSetExample {
  readonly data = new Map<string, unknown>([
    ['name', 'ark-ui-json-tree'],
    ['license', 'MIT'],
    ['elements', new Set(['ark-ui', 123, false, true, null, undefined, 456n])],
    [
      'nested',
      new Map<string, unknown>([
        [
          'taglines',
          new Set([
            { name: 'ark-ui', feature: 'headless components' },
            { name: 'ark-ui', feature: 'framework agnostic' },
            { name: 'ark-ui', feature: 'accessible by default' },
          ]),
        ],
      ]),
    ],
  ])
}
