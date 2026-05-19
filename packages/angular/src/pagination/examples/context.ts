import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkPaginationContext, ArkPaginationRoot } from '../public-api'
import { paginationExampleStyles } from '../pagination-example-styles'

@Component({
  selector: 'pagination-context-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkPaginationRoot, ArkPaginationContext],
  template: `
    <nav arkPagination [count]="100" [pageSize]="10" class="pagination-root">
      <ng-container *arkPaginationContext="let pagination">
        <div class="pagination-controls">
          <button type="button" class="pagination-trigger" (click)="pagination().goToFirstPage()">First</button>
          <button type="button" class="pagination-trigger" (click)="pagination().goToPrevPage()">Prev</button>
          <p class="pagination-page-count">Page {{ pagination().page }} of {{ pagination().totalPages }}</p>
          <button type="button" class="pagination-trigger" (click)="pagination().goToNextPage()">Next</button>
          <button type="button" class="pagination-trigger" (click)="pagination().goToLastPage()">Last</button>
        </div>
      </ng-container>
    </nav>
  `,
  styles: [paginationExampleStyles],
})
export class PaginationContextExample {}
