import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkJsonTreeViewRoot, ArkJsonTreeViewTree } from '../public-api'
import { jsonTreeViewExampleStyles } from '../json-tree-view-example-styles'

@Component({
  selector: 'json-tree-view-data-types-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkJsonTreeViewRoot, ArkJsonTreeViewTree],
  template: `
    <div arkJsonTreeView [data]="data" [defaultExpandedDepth]="2">
      <div arkJsonTreeViewTree [indentGuide]="true"></div>
    </div>
  `,
  styles: [jsonTreeViewExampleStyles],
})
export class JsonTreeViewDataTypesExample {
  readonly data = {
    list: [1, 'two', false, null],
    map: new Map<string, unknown>([
      ['name', 'ark-ui-json-tree'],
      ['items', new Set(['angular', 123, true])],
    ]),
    error: new Error('Unable to parse payload'),
    pattern: /^[a-z0-9]+/i,
    fn: function sum(a: number, b: number) {
      return a + b
    },
  }
}
