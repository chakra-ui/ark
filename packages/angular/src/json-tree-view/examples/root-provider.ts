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
export class JsonTreeViewRootProviderExample {
  private readonly injector = inject(Injector)
  readonly jsonTreeView = runInInjectionContext(this.injector, () =>
    useJsonTreeView({
      context: () => ({
        data: {
          name: 'John Doe',
          age: 30,
          email: 'john.doe@example.com',
          tags: ['tag1', 'tag2', 'tag3'],
          address: {
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zip: '12345',
          },
        },
        defaultExpandedDepth: 1,
      }),
    }),
  )
}
