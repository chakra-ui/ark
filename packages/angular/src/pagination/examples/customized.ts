import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkPaginationContext,
  ArkPaginationEllipsis,
  ArkPaginationItem,
  ArkPaginationNextTrigger,
  ArkPaginationPrevTrigger,
  ArkPaginationRoot,
} from '../public-api'
import { paginationExampleStyles } from '../pagination-example-styles'

@Component({
  selector: 'pagination-customized-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPaginationRoot,
    ArkPaginationPrevTrigger,
    ArkPaginationNextTrigger,
    ArkPaginationContext,
    ArkPaginationItem,
    ArkPaginationEllipsis,
  ],
  template: `
    <nav
      arkPagination
      [count]="5000"
      [pageSize]="20"
      [siblingCount]="3"
      [translations]="translations"
      class="pagination-root"
    >
      <div class="pagination-controls">
        <button arkPaginationPrevTrigger class="pagination-trigger">Prev</button>
        <ng-container *arkPaginationContext="let pagination">
          @for (entry of pagination().pages; track $index) {
            @if (entry.type === 'page') {
              <button arkPaginationItem [value]="entry.value" class="pagination-item">{{ entry.value }}</button>
            } @else {
              <span arkPaginationEllipsis [index]="$index" class="pagination-ellipsis">...</span>
            }
          }
        </ng-container>
        <button arkPaginationNextTrigger class="pagination-trigger">Next</button>
      </div>
    </nav>
  `,
  styles: [paginationExampleStyles],
})
export class PaginationCustomizedExample {
  readonly translations = {
    nextTriggerLabel: 'Next',
    prevTriggerLabel: 'Prev',
    itemLabel: ({ page }: { page: number }) => `Page ${page}`,
  }
}
