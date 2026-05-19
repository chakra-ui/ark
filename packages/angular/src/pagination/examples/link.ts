import { ChangeDetectionStrategy, Component, Injector, inject, runInInjectionContext } from '@angular/core'
import {
  ArkPaginationEllipsis,
  ArkPaginationItem,
  ArkPaginationNextTrigger,
  ArkPaginationPrevTrigger,
  ArkPaginationRootProvider,
  usePagination,
} from '../public-api'
import { paginationExampleStyles } from '../pagination-example-styles'

@Component({
  selector: 'pagination-link-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPaginationRootProvider,
    ArkPaginationPrevTrigger,
    ArkPaginationNextTrigger,
    ArkPaginationItem,
    ArkPaginationEllipsis,
  ],
  template: `
    <nav arkPaginationRootProvider [value]="pagination" class="pagination-root">
      <div class="pagination-controls">
        <a arkPaginationPrevTrigger class="pagination-trigger">&lt;</a>
        @for (entry of pagination.api().pages; track $index) {
          @if (entry.type === 'page') {
            <a arkPaginationItem [value]="entry.value" class="pagination-item">{{ entry.value }}</a>
          } @else {
            <span arkPaginationEllipsis [index]="$index" class="pagination-ellipsis">...</span>
          }
        }
        <a arkPaginationNextTrigger class="pagination-trigger">&gt;</a>
      </div>
    </nav>
  `,
  styles: [paginationExampleStyles],
})
export class PaginationLinkExample {
  private readonly injector = inject(Injector)
  readonly pagination = runInInjectionContext(this.injector, () =>
    usePagination({
      context: () => ({
        type: 'link',
        count: 100,
        pageSize: 10,
        siblingCount: 2,
        getPageUrl: ({ page }) => `/page=${page}`,
      }),
    }),
  )
}
