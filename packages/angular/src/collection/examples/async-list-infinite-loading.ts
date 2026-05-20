import { ChangeDetectionStrategy, Component, computed, signal, type OnInit } from '@angular/core'
import { asyncListExampleStyles } from '../async-list-example-styles'
import { type AsyncListProps, type AsyncListService, connectAsyncList, createAsyncListMachine } from '../public-api'

const LIMIT = 4

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

type AsyncListState = 'idle' | 'loading' | 'sorting'

interface AsyncListContext<T, C> {
  items: T[]
  filterText: string
  cursor?: C | null
  sortDescriptor?: { column: keyof T; direction: 'ascending' | 'descending' }
  error?: Error
}

@Component({
  selector: 'collection-async-list-infinite-loading-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="root">
      <div class="header">
        <span class="status">
          Loaded {{ api().items.length }} posts
          @if (api().cursor) {
            (more available)
          }
        </span>
        @if (api().cursor) {
          <button class="button" type="button" (click)="loadMore()" [disabled]="api().loading">
            @if (api().loading) {
              <span class="spinner" aria-hidden="true"></span>
              Loading
            } @else {
              Load More
            }
          </button>
        }
      </div>

      @if (api().error) {
        <div class="error">Error: {{ api().error.message }}</div>
      }

      <div class="item-group">
        @for (post of api().items; track post.id; let index = $index) {
          <div class="item">
            <div class="item-content">
              <div class="item-title">{{ index + 1 }}. {{ post.title }}</div>
              <div class="item-description">{{ post.body }}</div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [asyncListExampleStyles],
})
export class CollectionAsyncListInfiniteLoadingExample implements OnInit {
  private readonly refs = { abort: null as AbortController | null, seq: 0 }
  private readonly state = signal<AsyncListState>('idle')
  private readonly context = signal<AsyncListContext<Post, number>>({
    items: [],
    filterText: '',
    cursor: null,
  })

  private readonly props: AsyncListProps<Post, number> = {
    load: async ({ cursor }) => {
      const page = cursor || 1
      const start = (page - 1) * LIMIT
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${LIMIT}`)

      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }

      const posts = (await response.json()) as Post[]
      const hasNextPage = posts.length === LIMIT

      return {
        items: posts,
        cursor: hasNextPage ? page + 1 : undefined,
      }
    },
  }

  protected readonly api = computed(() =>
    connectAsyncList({
      context: { get: (key: keyof AsyncListContext<Post, number>) => this.context()[key] },
      send: (event: Record<string, unknown>) => this.handleEvent(event),
      state: { matches: (...values: string[]) => values.includes(this.state()) },
    } as unknown as AsyncListService<Post, number>),
  )

  ngOnInit(): void {
    this.api().reload()
  }

  protected loadMore(): void {
    this.api().loadMore()
  }

  private handleEvent(event: Record<string, unknown>): void {
    if (event['type'] === 'RELOAD') {
      this.state.set('loading')
      this.runAction('clearItems', event)
      this.runAction('performFetch', event)
      return
    }

    if (event['type'] === 'LOAD_MORE') {
      this.state.set('loading')
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
        get: (key: keyof AsyncListContext<Post, number>) => this.context()[key],
        set: this.setContext,
      },
      event,
      prop: (key: keyof AsyncListProps<Post, number>) => this.props[key],
      refs: {
        get: (key: keyof typeof this.refs) => this.refs[key],
        set: <K extends keyof typeof this.refs>(key: K, value: (typeof this.refs)[K]) => {
          this.refs[key] = value
        },
      },
      send: (nextEvent: Record<string, unknown>) => this.handleEvent(nextEvent),
    }
  }

  private readonly setContext = <K extends keyof AsyncListContext<Post, number>>(
    key: K,
    value:
      | AsyncListContext<Post, number>[K]
      | ((previous: AsyncListContext<Post, number>[K]) => AsyncListContext<Post, number>[K]),
  ): void => {
    this.context.update((context) => ({
      ...context,
      [key]: typeof value === 'function' ? value(context[key]) : value,
    }))
  }
}
