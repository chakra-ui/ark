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
  selector: 'pagination-basic-example',
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
    <nav arkPagination [count]="5000" [pageSize]="10" [siblingCount]="2" class="pagination-root">
      <div class="pagination-controls">
        <button arkPaginationPrevTrigger class="pagination-trigger">&lt;</button>
        <ng-container *arkPaginationContext="let pagination">
          @for (page of pagination().pages; track $index) {
            @if (page.type === 'page') {
              <button arkPaginationItem [value]="page.value" class="pagination-item">{{ page.value }}</button>
            } @else {
              <span arkPaginationEllipsis [index]="$index" class="pagination-ellipsis">...</span>
            }
          }
        </ng-container>
        <button arkPaginationNextTrigger class="pagination-trigger">&gt;</button>
      </div>
    </nav>
  `,
  styles: [paginationExampleStyles],
})
export class PaginationBasicExample {}
