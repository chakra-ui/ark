import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkPaginationContext, ArkPaginationRoot } from '../public-api'
import {
  PaginationChevronLeftIcon,
  PaginationChevronRightIcon,
  PaginationChevronsLeftIcon,
  PaginationChevronsRightIcon,
} from './icons'
import { paginationExampleStyles } from '../pagination-example-styles'

@Component({
  selector: 'pagination-context-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPaginationRoot,
    ArkPaginationContext,
    PaginationChevronLeftIcon,
    PaginationChevronRightIcon,
    PaginationChevronsLeftIcon,
    PaginationChevronsRightIcon,
  ],
  template: `
    <nav arkPagination [count]="100" [pageSize]="10" class="pagination-root">
      <ng-container *arkPaginationContext="let pagination">
        <div class="pagination-controls">
          <button type="button" class="pagination-trigger" (click)="pagination().goToFirstPage()">
            <pagination-chevrons-left-icon />
          </button>
          <button type="button" class="pagination-trigger" (click)="pagination().goToPrevPage()">
            <pagination-chevron-left-icon />
          </button>
          <p class="pagination-page-count">Page {{ pagination().page }} of {{ pagination().totalPages }}</p>
          <button type="button" class="pagination-trigger" (click)="pagination().goToNextPage()">
            <pagination-chevron-right-icon />
          </button>
          <button type="button" class="pagination-trigger" (click)="pagination().goToLastPage()">
            <pagination-chevrons-right-icon />
          </button>
        </div>
      </ng-container>
    </nav>
  `,
  styles: [paginationExampleStyles],
})
export class PaginationContextExample {}
