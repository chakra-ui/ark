import { ChangeDetectionStrategy, Component, Injector, inject, runInInjectionContext } from '@angular/core'
import {
  ArkPaginationContext,
  ArkPaginationEllipsis,
  ArkPaginationItem,
  ArkPaginationNextTrigger,
  ArkPaginationPrevTrigger,
  ArkPaginationRootProvider,
  usePagination,
} from '../public-api'
import { paginationExampleStyles } from '../pagination-example-styles'

@Component({
  selector: 'pagination-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPaginationRootProvider,
    ArkPaginationPrevTrigger,
    ArkPaginationNextTrigger,
    ArkPaginationContext,
    ArkPaginationItem,
    ArkPaginationEllipsis,
  ],
  template: `
    <div class="pagination-root">
      <button type="button" class="pagination-trigger" (click)="pagination.api().goToNextPage()">&gt;</button>

      <nav arkPaginationRootProvider [value]="pagination">
        <div class="pagination-controls">
          <button arkPaginationPrevTrigger class="pagination-trigger">&lt;</button>
          <ng-container *arkPaginationContext="let api">
            @for (entry of api().pages; track $index) {
              @if (entry.type === 'page') {
                <button arkPaginationItem [value]="entry.value" class="pagination-item">{{ entry.value }}</button>
              } @else {
                <span arkPaginationEllipsis [index]="$index" class="pagination-ellipsis">...</span>
              }
            }
          </ng-container>
          <button arkPaginationNextTrigger class="pagination-trigger">&gt;</button>
        </div>
      </nav>
    </div>
  `,
  styles: [paginationExampleStyles],
})
export class PaginationRootProviderExample {
  private readonly injector = inject(Injector)
  readonly pagination = runInInjectionContext(this.injector, () =>
    usePagination({ context: () => ({ count: 5000, pageSize: 10, siblingCount: 2 }) }),
  )
}
