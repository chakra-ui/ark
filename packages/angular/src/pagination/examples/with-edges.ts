import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkPaginationContext,
  ArkPaginationEllipsis,
  ArkPaginationFirstTrigger,
  ArkPaginationItem,
  ArkPaginationLastTrigger,
  ArkPaginationNextTrigger,
  ArkPaginationPrevTrigger,
  ArkPaginationRoot,
} from '../public-api'
import { paginationExampleStyles } from '../pagination-example-styles'

@Component({
  selector: 'pagination-with-edges-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPaginationRoot,
    ArkPaginationFirstTrigger,
    ArkPaginationPrevTrigger,
    ArkPaginationNextTrigger,
    ArkPaginationLastTrigger,
    ArkPaginationContext,
    ArkPaginationItem,
    ArkPaginationEllipsis,
  ],
  template: `
    <nav arkPagination [count]="5000" [pageSize]="20" [siblingCount]="2" class="pagination-root">
      <div class="pagination-controls">
        <button arkPaginationFirstTrigger class="pagination-trigger">&lt;&lt;</button>
        <button arkPaginationPrevTrigger class="pagination-trigger">&lt;</button>
        <ng-container *arkPaginationContext="let pagination">
          @for (entry of pagination().pages; track $index) {
            @if (entry.type === 'page') {
              <button arkPaginationItem [value]="entry.value" class="pagination-item">{{ entry.value }}</button>
            } @else {
              <span arkPaginationEllipsis [index]="$index" class="pagination-ellipsis">...</span>
            }
          }
        </ng-container>
        <button arkPaginationNextTrigger class="pagination-trigger">&gt;</button>
        <button arkPaginationLastTrigger class="pagination-trigger">&gt;&gt;</button>
      </div>
    </nav>
  `,
  styles: [paginationExampleStyles],
})
export class PaginationWithEdgesExample {}
