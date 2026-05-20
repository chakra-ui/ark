import { ChangeDetectionStrategy, Component, computed, signal, type OnInit } from '@angular/core'
import { asyncListExampleStyles } from '../async-list-example-styles'
import { type AsyncListProps, type AsyncListService, connectAsyncList, createAsyncListMachine } from '../public-api'

interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
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

@Component({
  selector: 'collection-async-list-sort-client-side-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="root">
      @if (api().loading) {
        <div class="loading">
          <span class="spinner" aria-hidden="true"></span>
          Loading
        </div>
      }
      @if (api().error) {
        <div class="error">Error: {{ api().error.message }}</div>
      }
      <div class="status">Sorted by: {{ sortLabel() }}</div>

      <table class="table">
        <thead>
          <tr>
            @for (column of columns; track column.key) {
              <th scope="col" [attr.aria-sort]="ariaSort(column.key)" (click)="sort(column.key)">
                <button type="button">
                  {{ column.label }}
                  <span class="sort-icon" aria-hidden="true" [innerHTML]="sortIcon(column.key)"></span>
                </button>
              </th>
            }
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
  styles: [asyncListExampleStyles],
})
export class CollectionAsyncListSortClientSideExample implements OnInit {
  protected readonly columns: Array<{ key: keyof User; label: string }> = [
    { key: 'name', label: 'Name' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
  ]

  private readonly collator = new Intl.Collator()
  private readonly refs = { abort: null as AbortController | null, seq: 0 }
  private readonly state = signal<AsyncListState>('idle')
  private readonly context = signal<AsyncListContext<User, undefined>>({
    items: [],
    filterText: '',
    cursor: null,
  })

  private readonly props: AsyncListProps<User, undefined> = {
    load: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data = (await response.json()) as User[]
      return { items: data }
    },
    sort: ({ items, descriptor }) => ({
      items: [...items].sort((a, b) => {
        let compare = this.collator.compare(String(a[descriptor.column]), String(b[descriptor.column]))
        if (descriptor.direction === 'descending') {
          compare *= -1
        }
        return compare
      }),
    }),
  }

  protected readonly api = computed(() =>
    connectAsyncList({
      context: { get: (key: keyof AsyncListContext<User, undefined>) => this.context()[key] },
      send: (event: Record<string, unknown>) => this.handleEvent(event),
      state: { matches: (...values: string[]) => values.includes(this.state()) },
    } as unknown as AsyncListService<User, undefined>),
  )

  ngOnInit(): void {
    this.api().reload()
  }

  protected sort(column: keyof User): void {
    const current = this.api().sortDescriptor
    const direction: SortDirection =
      current?.column === column && current.direction === 'ascending' ? 'descending' : 'ascending'
    this.api().sort({ column, direction })
  }

  protected sortLabel(): string {
    const descriptor = this.api().sortDescriptor
    return descriptor ? `${String(descriptor.column)} (${descriptor.direction})` : 'none'
  }

  protected ariaSort(column: keyof User): 'ascending' | 'descending' | 'none' {
    const descriptor = this.api().sortDescriptor
    return descriptor?.column === column ? descriptor.direction : 'none'
  }

  protected sortIcon(column: keyof User): string {
    const descriptor = this.api().sortDescriptor
    if (descriptor?.column !== column) {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>'
    }
    if (descriptor.direction === 'ascending') {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>'
    }
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>'
  }

  private handleEvent(event: Record<string, unknown>): void {
    if (event['type'] === 'RELOAD') {
      this.state.set('loading')
      this.runAction('clearItems', event)
      this.runAction('performFetch', event)
      return
    }

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
        get: (key: keyof AsyncListContext<User, undefined>) => this.context()[key],
        set: this.setContext,
      },
      event,
      prop: (key: keyof AsyncListProps<User, undefined>) => this.props[key],
      refs: {
        get: (key: keyof typeof this.refs) => this.refs[key],
        set: <K extends keyof typeof this.refs>(key: K, value: (typeof this.refs)[K]) => {
          this.refs[key] = value
        },
      },
      send: (nextEvent: Record<string, unknown>) => this.handleEvent(nextEvent),
    }
  }

  private readonly setContext = <K extends keyof AsyncListContext<User, undefined>>(
    key: K,
    value:
      | AsyncListContext<User, undefined>[K]
      | ((previous: AsyncListContext<User, undefined>[K]) => AsyncListContext<User, undefined>[K]),
  ): void => {
    this.context.update((context) => ({
      ...context,
      [key]: typeof value === 'function' ? value(context[key]) : value,
    }))
  }
}
