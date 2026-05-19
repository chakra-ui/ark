import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkJsonTreeViewRoot, ArkJsonTreeViewTree } from '../public-api'
import { jsonTreeViewExampleStyles } from '../json-tree-view-example-styles'

const testArray = [1, 2, 3, 4, 5]
Object.defineProperties(testArray, {
  customProperty: { value: 'custom value', enumerable: false, writable: false },
  anotherProperty: { value: 42, enumerable: false, writable: false },
})

@Component({
  selector: 'json-tree-view-array-data-example',
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
export class JsonTreeViewArrayDataExample {
  readonly data = {
    normalArray: [1, 2, 3],
    arrayWithNonEnumerableProperties: testArray,
    sparseArray: (() => {
      const sparse: string[] = []
      sparse[0] = 'first'
      sparse[5] = 'sixth'
      return sparse
    })(),
  }
}
