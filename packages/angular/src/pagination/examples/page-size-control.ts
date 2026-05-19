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
  selector: 'pagination-page-size-control-example',
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
    <nav arkPagination [count]="100" [defaultPageSize]="10" class="pagination-root">
      <ng-container *arkPaginationContext="let pagination">
        <label class="pagination-page-size">
          <span class="pagination-text">Items per page:</span>
          <select [value]="pagination().pageSize" (change)="setPageSize($event, pagination().setPageSize)">
            <option [value]="5">5</option>
            <option [value]="10">10</option>
            <option [value]="20">20</option>
            <option [value]="50">50</option>
          </select>
        </label>

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

        <p class="pagination-text">Page {{ pagination().page }} of {{ pagination().totalPages }}</p>
      </ng-container>
    </nav>
  `,
  styles: [paginationExampleStyles],
})
export class PaginationPageSizeControlExample {
  setPageSize(event: Event, setPageSize: (size: number) => void): void {
    const select = event.target as HTMLSelectElement
    setPageSize(Number(select.value))
  }
}
