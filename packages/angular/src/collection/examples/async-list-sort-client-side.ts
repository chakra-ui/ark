import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { type AsyncListProps, type AsyncListService, connectAsyncList, createAsyncListMachine } from '../public-api'

interface User {
  id: number
  name: string
  username: string
  email: string
}

type AsyncListState = 'idle' | 'loading' | 'sorting'
type SortDirection = 'ascending' | 'descending'

interface SortDescriptor<T> {
  column: keyof T
  direction: SortDirection
}

interface AsyncListContext<T, C> {
  items: T[]
  filterText: string
  cursor?: C | null
  sortDescriptor?: SortDescriptor<T>
  error?: Error
}

const users: User[] = [
  { id: 1, name: 'Charlie Lane', username: 'charlie', email: 'charlie@example.com' },
  { id: 2, name: 'Alice Moore', username: 'alice', email: 'alice@example.com' },
  { id: 3, name: 'Bob Stone', username: 'bob', email: 'bob@example.com' },
]

@Component({
  selector: 'collection-async-list-sort-client-side-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="async-list">
      <output>Sorted by: {{ sortLabel() }}</output>

      <table>
        <thead>
          <tr>
            <th scope="col" [attr.aria-sort]="ariaSort('name')">
              <button type="button" (click)="sort('name')">Name {{ sortMarker('name') }}</button>
            </th>
            <th scope="col" [attr.aria-sort]="ariaSort('username')">
              <button type="button" (click)="sort('username')">Username {{ sortMarker('username') }}</button>
            </th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          @for (user of api().items; track user.id) {
            <tr>
              <td>{{ user.name }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      .async-list {
        display: grid;
        gap: 0.75rem;
        max-width: 42rem;
      }

      table {
        border-collapse: collapse;
        width: 100%;
      }

      th,
      td {
        border-bottom: 1px solid #e4e4e7;
        padding: 0.5rem;
        text-align: left;
      }

      th {
        color: #3f3f46;
        font-size: 0.875rem;
      }

      th button {
        background: transparent;
        border: 0;
        color: inherit;
        cursor: pointer;
        font: inherit;
        padding: 0;
      }

      output {
        color: #52525b;
      }
    `,
  ],
})
export class CollectionAsyncListSortClientSideExample {
  private readonly refs = { abort: null as AbortController | null, seq: 0 }
  private readonly state = signal<AsyncListState>('idle')
  private readonly context = signal<AsyncListContext<User, string>>({
    items: users,
    filterText: '',
    cursor: null,
  })

  private readonly props: AsyncListProps<User, string> = {
    initialItems: users,
    load: async () => ({ items: users }),
    sort: ({ items, descriptor }) => ({
      items: [...items].sort((a, b) => {
        const compare = String(a[descriptor.column]).localeCompare(String(b[descriptor.column]))
        return descriptor.direction === 'ascending' ? compare : compare * -1
      }),
    }),
  }

  protected readonly api = computed(() =>
    connectAsyncList({
      context: { get: (key: keyof AsyncListContext<User, string>) => this.context()[key] },
      send: (event: Record<string, unknown>) => this.handleEvent(event),
      state: { matches: (...values: string[]) => values.includes(this.state()) },
    } as unknown as AsyncListService<User, string>),
  )

  protected sort(column: keyof User): void {
    const current = this.api().sortDescriptor
    const direction: SortDirection =
      current?.column === column && current.direction === 'ascending' ? 'descending' : 'ascending'
    this.api().sort({ column, direction })
  }

  protected sortLabel(): string {
    const descriptor = this.api().sortDescriptor
    return descriptor ? `${String(descriptor.column)} ${descriptor.direction}` : 'none'
  }

  protected sortMarker(column: keyof User): string {
    const descriptor = this.api().sortDescriptor
    if (descriptor?.column !== column) return ''
    return descriptor.direction === 'ascending' ? 'asc' : 'desc'
  }

  protected ariaSort(column: keyof User): 'ascending' | 'descending' | 'none' {
    const descriptor = this.api().sortDescriptor
    return descriptor?.column === column ? descriptor.direction : 'none'
  }

  private handleEvent(event: Record<string, unknown>): void {
    if (event['type'] === 'SORT') {
      this.state.set('sorting')
      this.runAction('setSortDescriptor', event)
      this.runAction('clearCursor', event)
      this.runAction('performSort', event)
      return
    }

    if (event['type'] === 'SUCCESS') {
      this.runAction('setItems', event)
      this.runAction('setCursor', event)
      this.runAction('clearError', event)
      this.state.set('idle')
      return
    }

    if (event['type'] === 'ERROR') {
      this.runAction('setError', event)
      this.state.set('idle')
    }
  }

  private runAction(name: string, event: Record<string, unknown>): void {
    const action = createAsyncListMachine.implementations?.actions?.[name] as
      | ((params: Record<string, unknown>) => void)
      | undefined
    if (!action) throw new Error(`Missing async-list action "${name}"`)
    action(this.createActionParams(event))
  }

  private createActionParams(event: Record<string, unknown>): Record<string, unknown> {
    return {
      context: {
        get: (key: keyof AsyncListContext<User, string>) => this.context()[key],
        set: this.setContext,
      },
      event,
      prop: (key: keyof AsyncListProps<User, string>) => this.props[key],
      refs: {
        get: (key: keyof typeof this.refs) => this.refs[key],
        set: <K extends keyof typeof this.refs>(key: K, value: (typeof this.refs)[K]) => {
          this.refs[key] = value
        },
      },
      send: (nextEvent: Record<string, unknown>) => this.handleEvent(nextEvent),
    }
  }

  private readonly setContext = <K extends keyof AsyncListContext<User, string>>(
    key: K,
    value:
      | AsyncListContext<User, string>[K]
      | ((previous: AsyncListContext<User, string>[K]) => AsyncListContext<User, string>[K]),
  ): void => {
    this.context.update((context) => ({
      ...context,
      [key]: typeof value === 'function' ? value(context[key]) : value,
    }))
  }
}
