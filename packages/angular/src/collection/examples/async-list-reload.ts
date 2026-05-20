import { ChangeDetectionStrategy, Component, computed, signal, type OnInit } from '@angular/core'
import { asyncListExampleStyles } from '../async-list-example-styles'
import { type AsyncListProps, type AsyncListService, connectAsyncList, createAsyncListMachine } from '../public-api'

interface Quote {
  id: number
  quote: string
  author: string
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
  selector: 'collection-async-list-reload-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="root">
      <div class="header">
        <button class="button" type="button" (click)="reload()" [disabled]="api().loading">
          @if (api().loading) {
            <span class="spinner" aria-hidden="true"></span>
            Loading
          } @else {
            Reload Quotes
          }
        </button>
      </div>

      @if (api().error) {
        <div class="error">Error: {{ api().error.message }}</div>
      }

      <div class="item-group">
        @for (quote of api().items; track quote.id) {
          <div class="item">
            <div class="item-content">
              <div class="item-description">"{{ quote.quote }}"</div>
              <div class="item-meta">- {{ quote.author }}</div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [asyncListExampleStyles],
})
export class CollectionAsyncListReloadExample implements OnInit {
  private readonly refs = { abort: null as AbortController | null, seq: 0 }
  private readonly state = signal<AsyncListState>('idle')
  private readonly context = signal<AsyncListContext<Quote, undefined>>({
    items: [],
    filterText: '',
    cursor: null,
  })

  private readonly props: AsyncListProps<Quote, undefined> = {
    load: async () => {
      const response = await fetch(`https://dummyjson.com/quotes?limit=4&skip=${Math.floor(Math.random() * 50)}`)

      if (!response.ok) {
        throw new Error('Failed to fetch quotes')
      }

      const data = (await response.json()) as { quotes: Quote[] }
      return { items: data.quotes }
    },
  }

  protected readonly api = computed(() =>
    connectAsyncList({
      context: { get: (key: keyof AsyncListContext<Quote, undefined>) => this.context()[key] },
      send: (event: Record<string, unknown>) => this.handleEvent(event),
      state: { matches: (...values: string[]) => values.includes(this.state()) },
    } as unknown as AsyncListService<Quote, undefined>),
  )

  ngOnInit(): void {
    this.reload()
  }

  protected reload(): void {
    this.api().reload()
  }

  private handleEvent(event: Record<string, unknown>): void {
    if (event['type'] === 'RELOAD') {
      this.state.set('loading')
      this.runAction('clearItems', event)
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
        get: (key: keyof AsyncListContext<Quote, undefined>) => this.context()[key],
        set: this.setContext,
      },
      event,
      prop: (key: keyof AsyncListProps<Quote, undefined>) => this.props[key],
      refs: {
        get: (key: keyof typeof this.refs) => this.refs[key],
        set: <K extends keyof typeof this.refs>(key: K, value: (typeof this.refs)[K]) => {
          this.refs[key] = value
        },
      },
      send: (nextEvent: Record<string, unknown>) => this.handleEvent(nextEvent),
    }
  }

  private readonly setContext = <K extends keyof AsyncListContext<Quote, undefined>>(
    key: K,
    value:
      | AsyncListContext<Quote, undefined>[K]
      | ((previous: AsyncListContext<Quote, undefined>[K]) => AsyncListContext<Quote, undefined>[K]),
  ): void => {
    this.context.update((context) => ({
      ...context,
      [key]: typeof value === 'function' ? value(context[key]) : value,
    }))
  }
}
