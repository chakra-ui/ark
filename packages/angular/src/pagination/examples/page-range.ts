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
  selector: 'pagination-page-range-example',
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
    <nav arkPagination [count]="100" [pageSize]="10" class="pagination-root">
      <ng-container *arkPaginationContext="let pagination">
        <div class="pagination-controls">
          <button arkPaginationPrevTrigger class="pagination-trigger">&lt;</button>
          @for (entry of pagination().pages; track $index) {
            @if (entry.type === 'page') {
              <button arkPaginationItem [value]="entry.value" class="pagination-item">{{ entry.value }}</button>
            } @else {
              <span arkPaginationEllipsis [index]="$index" class="pagination-ellipsis">...</span>
            }
          }
          <button arkPaginationNextTrigger class="pagination-trigger">&gt;</button>
        </div>

        <div class="pagination-stack">
          <p class="pagination-text">
            Showing {{ pagination().pageRange.start + 1 }}-{{ pagination().pageRange.end }} of
            {{ pagination().count }} results
          </p>
          <p class="pagination-text">Page {{ pagination().page }} of {{ pagination().totalPages }}</p>
        </div>
      </ng-container>
    </nav>
  `,
  styles: [paginationExampleStyles],
})
export class PaginationPageRangeExample {}
