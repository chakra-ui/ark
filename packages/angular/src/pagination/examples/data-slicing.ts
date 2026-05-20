import { ChangeDetectionStrategy, Component } from '@angular/core'
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

interface User {
  id: number
  name: string
  email: string
}

const users: User[] = [
  { id: 1, name: 'Emma Wilson', email: 'emma@example.com' },
  { id: 2, name: 'Liam Johnson', email: 'liam@example.com' },
  { id: 3, name: 'Olivia Brown', email: 'olivia@example.com' },
  { id: 4, name: 'Noah Davis', email: 'noah@example.com' },
  { id: 5, name: 'Ava Martinez', email: 'ava@example.com' },
  { id: 6, name: 'Ethan Garcia', email: 'ethan@example.com' },
  { id: 7, name: 'Sophia Rodriguez', email: 'sophia@example.com' },
  { id: 8, name: 'Mason Lee', email: 'mason@example.com' },
  { id: 9, name: 'Isabella Walker', email: 'isabella@example.com' },
  { id: 10, name: 'James Hall', email: 'james@example.com' },
  { id: 11, name: 'Mia Allen', email: 'mia@example.com' },
  { id: 12, name: 'Benjamin Young', email: 'benjamin@example.com' },
  { id: 13, name: 'Charlotte King', email: 'charlotte@example.com' },
  { id: 14, name: 'William Wright', email: 'william@example.com' },
  { id: 15, name: 'Amelia Scott', email: 'amelia@example.com' },
  { id: 16, name: 'Henry Green', email: 'henry@example.com' },
  { id: 17, name: 'Harper Adams', email: 'harper@example.com' },
  { id: 18, name: 'Sebastian Baker', email: 'sebastian@example.com' },
  { id: 19, name: 'Evelyn Nelson', email: 'evelyn@example.com' },
  { id: 20, name: 'Jack Carter', email: 'jack@example.com' },
]

@Component({
  selector: 'pagination-data-slicing-example',
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
    <nav arkPagination [count]="users.length" [pageSize]="5" class="pagination-root">
      <ng-container *arkPaginationContext="let pagination">
        <div class="pagination-grid">
          @for (user of pagination().slice(users); track user.id) {
            <div class="pagination-grid-item">
              <span class="pagination-grid-item-title">{{ user.name }}</span>
              <span class="pagination-grid-item-text">{{ user.email }}</span>
            </div>
          }
        </div>

        <div class="pagination-controls">
          <button arkPaginationPrevTrigger class="pagination-trigger"><pagination-chevron-left-icon /></button>
          @for (entry of pagination().pages; track $index) {
            @if (entry.type === 'page') {
              <button arkPaginationItem [value]="entry.value" class="pagination-item">{{ entry.value }}</button>
            } @else {
              <span arkPaginationEllipsis [index]="$index" class="pagination-ellipsis">...</span>
            }
          }
          <button arkPaginationNextTrigger class="pagination-trigger"><pagination-chevron-right-icon /></button>
        </div>
      </ng-container>
    </nav>
  `,
  styles: [paginationExampleStyles],
})
export class PaginationDataSlicingExample {
  readonly users = users
}
