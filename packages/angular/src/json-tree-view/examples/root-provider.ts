import { ChangeDetectionStrategy, Component, Injector, inject, runInInjectionContext } from '@angular/core'
import { ArkJsonTreeViewRootProvider, ArkJsonTreeViewTree, useJsonTreeView } from '../public-api'
import { jsonTreeViewExampleStyles } from '../json-tree-view-example-styles'

@Component({
  selector: 'json-tree-view-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkJsonTreeViewRootProvider, ArkJsonTreeViewTree],
  template: `
    <div arkJsonTreeViewRootProvider [value]="jsonTreeView">
      <div arkJsonTreeViewTree></div>
    </div>
  `,
  styles: [jsonTreeViewExampleStyles],
})
export class JsonTreeViewRootProviderExample {
  private readonly injector = inject(Injector)
  readonly jsonTreeView = runInInjectionContext(this.injector, () =>
    useJsonTreeView({
      context: () => ({
        data: {
          name: 'John Doe',
          age: 30,
          tags: ['tag1', 'tag2', 'tag3'],
        },
        defaultExpandedDepth: 1,
      }),
    }),
  )
}
