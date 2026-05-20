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
import {
  PaginationChevronLeftIcon,
  PaginationChevronRightIcon,
  PaginationChevronsLeftIcon,
  PaginationChevronsRightIcon,
} from './icons'
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
    PaginationChevronLeftIcon,
    PaginationChevronRightIcon,
    PaginationChevronsLeftIcon,
    PaginationChevronsRightIcon,
  ],
  template: `
    <nav arkPagination [count]="5000" [pageSize]="20" [siblingCount]="2" class="pagination-root">
      <div class="pagination-controls">
        <button arkPaginationFirstTrigger class="pagination-trigger"><pagination-chevrons-left-icon /></button>
        <button arkPaginationPrevTrigger class="pagination-trigger"><pagination-chevron-left-icon /></button>
        <ng-container *arkPaginationContext="let pagination">
          @for (entry of pagination().pages; track $index) {
            @if (entry.type === 'page') {
              <button arkPaginationItem [value]="entry.value" class="pagination-item">{{ entry.value }}</button>
            } @else {
              <span arkPaginationEllipsis [index]="$index" class="pagination-ellipsis">...</span>
            }
          }
        </ng-container>
        <button arkPaginationNextTrigger class="pagination-trigger"><pagination-chevron-right-icon /></button>
        <button arkPaginationLastTrigger class="pagination-trigger"><pagination-chevrons-right-icon /></button>
      </div>
    </nav>
  `,
  styles: [paginationExampleStyles],
})
export class PaginationWithEdgesExample {}
