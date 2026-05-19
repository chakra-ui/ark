import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { type AsyncListProps, type AsyncListService, connectAsyncList, createAsyncListMachine } from '../public-api'

interface User {
  id: number
  name: string
  email: string
  team: string
}

type AsyncListState = 'idle' | 'loading' | 'sorting'

interface AsyncListContext<T, C> {
  items: T[]
  filterText: string
  cursor?: C | null
  sortDescriptor?: { column: keyof T; direction: 'ascending' | 'descending' }
  error?: Error
}

const users: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', team: 'Engineering' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', team: 'Marketing' },
  { id: 3, name: 'Carol Davis', email: 'carol@example.com', team: 'Engineering' },
  { id: 4, name: 'David Wilson', email: 'david@example.com', team: 'Sales' },
]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

@Component({
  selector: 'collection-async-list-filter-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="async-list">
      <label class="field">
        <span>Search users</span>
        <input type="search" [value]="api().filterText" (input)="search($event)" />
      </label>

      @if (api().loading) {
        <p class="status">Searching</p>
      }

      <div class="items">
        @for (user of api().items; track user.id) {
          <article class="item">
            <strong>{{ user.name }}</strong>
            <span>{{ user.email }}</span>
            <small>{{ user.team }}</small>
          </article>
        }
      </div>

      @if (api().empty && !api().loading) {
        <p class="status">No results</p>
      }
    </div>
  `,
  styles: [
    `
      .async-list {
        display: grid;
        gap: 0.75rem;
        max-width: 28rem;
      }

      .field {
        display: grid;
        gap: 0.375rem;
      }

      input {
        border: 1px solid #a1a1aa;
        border-radius: 0.375rem;
        min-height: 2.5rem;
        padding: 0 0.75rem;
      }

      .items {
        display: grid;
        gap: 0.5rem;
      }

      .item {
        border-bottom: 1px solid #e4e4e7;
        display: grid;
        gap: 0.125rem;
        padding: 0.5rem 0;
      }

      .item span,
      .item small,
      .status {
        color: #52525b;
      }

      .status {
        margin: 0;
      }
    `,
  ],
})
export class CollectionAsyncListFilterExample {
  private readonly refs = { abort: null as AbortController | null, seq: 0 }
  private readonly state = signal<AsyncListState>('idle')
  private readonly context = signal<AsyncListContext<User, string>>({
    items: users,
    filterText: '',
    cursor: null,
  })

  private readonly props: AsyncListProps<User, string> = {
    initialItems: users,
    load: async ({ filterText }) => {
      await delay(200)
      const query = filterText.trim().toLowerCase()
      const items = query
        ? users.filter((user) => `${user.name} ${user.email} ${user.team}`.toLowerCase().includes(query))
        : users
      return { items }
    },
  }

  protected readonly api = computed(() =>
    connectAsyncList({
      context: { get: (key: keyof AsyncListContext<User, string>) => this.context()[key] },
      send: (event: Record<string, unknown>) => this.handleEvent(event),
      state: { matches: (...values: string[]) => values.includes(this.state()) },
    } as unknown as AsyncListService<User, string>),
  )

  protected search(event: Event): void {
    this.api().setFilterText((event.target as HTMLInputElement).value)
  }

  private handleEvent(event: Record<string, unknown>): void {
    if (event['type'] === 'FILTER') {
      this.state.set('loading')
      this.runAction('setFilterText', event)
      this.runAction('clearCursor', event)
      this.runAction('performFetch', event)
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
