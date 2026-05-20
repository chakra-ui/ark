import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkPaginationContext,
  ArkPaginationEllipsis,
  ArkPaginationItem,
  ArkPaginationNextTrigger,
  ArkPaginationPrevTrigger,
  ArkPaginationRoot,
} from '../public-api'
import { PaginationChevronLeftIcon, PaginationChevronRightIcon } from './icons'
import { paginationExampleStyles } from '../pagination-example-styles'

@Component({
  selector: 'pagination-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPaginationRoot,
    ArkPaginationPrevTrigger,
    ArkPaginationNextTrigger,
    ArkPaginationContext,
    ArkPaginationItem,
    ArkPaginationEllipsis,
    PaginationChevronLeftIcon,
    PaginationChevronRightIcon,
  ],
  template: `
    <nav arkPagination [count]="5000" [pageSize]="10" [siblingCount]="2" [(page)]="page" class="pagination-root">
      <div class="pagination-controls">
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
      </div>
    </nav>
  `,
  styles: [paginationExampleStyles],
})
export class PaginationControlledExample {
  readonly page = signal(1)
}
