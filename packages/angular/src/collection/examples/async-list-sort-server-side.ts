import { ChangeDetectionStrategy, Component, computed, signal, type OnInit } from '@angular/core'
import { asyncListExampleStyles } from '../async-list-example-styles'
import { type AsyncListProps, type AsyncListService, connectAsyncList, createAsyncListMachine } from '../public-api'

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
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
  selector: 'collection-async-list-sort-server-side-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="root">
      <div class="header">
        <button class="button" type="button" (click)="sortByTitle()">
          Sort by title
          <span class="sort-icon" aria-hidden="true" [innerHTML]="sortIcon('title')"></span>
        </button>
        @if (api().loading) {
          <span class="loading">
            <span class="spinner" aria-hidden="true"></span>
            Loading
          </span>
        }
      </div>

      @if (api().error) {
        <div class="error">Error: {{ api().error.message }}</div>
      }

      <div class="item-group">
        @for (product of api().items; track product.id) {
          <div class="item" data-variant="outline">
            <div class="item-media">
              <img [src]="product.image" [alt]="product.title" />
            </div>
            <div class="item-content">
              <div class="item-title">{{ product.title }}</div>
              <div class="item-description">\${{ product.price }}</div>
              <div class="item-meta">
                {{ product.category }} &bull; {{ product.rating.rate }} ({{ product.rating.count }} reviews)
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [asyncListExampleStyles],
})
export class CollectionAsyncListSortServerSideExample implements OnInit {
  private readonly refs = { abort: null as AbortController | null, seq: 0 }
  private readonly state = signal<AsyncListState>('idle')
  private readonly context = signal<AsyncListContext<Product, undefined>>({
    items: [],
    filterText: '',
    cursor: null,
  })

  private readonly props: AsyncListProps<Product, undefined> = {
    load: async ({ sortDescriptor }) => {
      const url = new URL('https://fakestoreapi.com/products')
      url.searchParams.set('limit', '5')
      if (sortDescriptor) {
        url.searchParams.set('sort', sortDescriptor.direction === 'ascending' ? 'asc' : 'desc')
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const items = (await response.json()) as Product[]
      return { items }
    },
  }

  protected readonly api = computed(() =>
    connectAsyncList({
      context: { get: (key: keyof AsyncListContext<Product, undefined>) => this.context()[key] },
      send: (event: Record<string, unknown>) => this.handleEvent(event),
      state: { matches: (...values: string[]) => values.includes(this.state()) },
    } as unknown as AsyncListService<Product, undefined>),
  )

  ngOnInit(): void {
    this.api().reload()
  }

  protected sortByTitle(): void {
    const current = this.api().sortDescriptor
    const direction: SortDirection =
      current?.column === 'title' && current.direction === 'ascending' ? 'descending' : 'ascending'
    this.api().sort({ column: 'title', direction })
  }

  protected sortIcon(column: keyof Product): string {
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
      this.state.set('loading')
      this.runAction('setSortDescriptor', event)
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
        get: (key: keyof AsyncListContext<Product, undefined>) => this.context()[key],
        set: this.setContext,
      },
      event,
      prop: (key: keyof AsyncListProps<Product, undefined>) => this.props[key],
      refs: {
        get: (key: keyof typeof this.refs) => this.refs[key],
        set: <K extends keyof typeof this.refs>(key: K, value: (typeof this.refs)[K]) => {
          this.refs[key] = value
        },
      },
      send: (nextEvent: Record<string, unknown>) => this.handleEvent(nextEvent),
    }
  }

  private readonly setContext = <K extends keyof AsyncListContext<Product, undefined>>(
    key: K,
    value:
      | AsyncListContext<Product, undefined>[K]
      | ((previous: AsyncListContext<Product, undefined>[K]) => AsyncListContext<Product, undefined>[K]),
  ): void => {
    this.context.update((context) => ({
      ...context,
      [key]: typeof value === 'function' ? value(context[key]) : value,
    }))
  }
}
