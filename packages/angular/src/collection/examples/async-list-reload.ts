import { ChangeDetectionStrategy, Component, computed, signal, type OnInit } from '@angular/core'
import { type AsyncListProps, type AsyncListService, connectAsyncList, createAsyncListMachine } from '../public-api'

interface Quote {
  id: number
  text: string
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

const quoteBatches: Quote[][] = [
  [
    { id: 1, text: 'Clarity beats cleverness.', author: 'Ada Lovelace' },
    { id: 2, text: 'Make it work, then make it obvious.', author: 'Grace Hopper' },
  ],
  [
    { id: 3, text: 'Small systems reveal large truths.', author: 'Katherine Johnson' },
    { id: 4, text: 'Good tools remove ceremony.', author: 'Mary Jackson' },
  ],
]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

@Component({
  selector: 'collection-async-list-reload-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="async-list">
      <div class="header">
        <output>{{ api().items.length }} quotes</output>
        <button type="button" (click)="reload()" [disabled]="api().loading">
          {{ api().loading ? 'Loading' : 'Reload quotes' }}
        </button>
      </div>

      @if (api().error) {
        <p class="error">Error: {{ api().error.message }}</p>
      }

      <div class="items">
        @for (quote of api().items; track quote.id) {
          <article class="item">
            <p>{{ quote.text }}</p>
            <small>{{ quote.author }}</small>
          </article>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .async-list {
        display: grid;
        gap: 0.75rem;
        max-width: 30rem;
      }

      .header {
        align-items: center;
        display: flex;
        gap: 0.75rem;
        justify-content: space-between;
      }

      .items {
        display: grid;
        gap: 0.5rem;
      }

      .item {
        border: 1px solid #d4d4d8;
        border-radius: 0.375rem;
        display: grid;
        gap: 0.25rem;
        padding: 0.75rem;
      }

      .item p {
        margin: 0;
      }

      .item small {
        color: #52525b;
      }

      .error {
        color: #b91c1c;
        margin: 0;
      }
    `,
  ],
})
export class CollectionAsyncListReloadExample implements OnInit {
  private quoteBatch = 0
  private readonly refs = { abort: null as AbortController | null, seq: 0 }
  private readonly state = signal<AsyncListState>('idle')
  private readonly context = signal<AsyncListContext<Quote, string>>({
    items: [],
    filterText: '',
    cursor: null,
  })

  private readonly props: AsyncListProps<Quote, string> = {
    load: async () => {
      await delay(250)
      const items = quoteBatches[this.quoteBatch % quoteBatches.length]
      this.quoteBatch += 1
      return { items }
    },
  }

  protected readonly api = computed(() =>
    connectAsyncList({
      context: { get: (key: keyof AsyncListContext<Quote, string>) => this.context()[key] },
      send: (event: Record<string, unknown>) => this.handleEvent(event),
      state: { matches: (...values: string[]) => values.includes(this.state()) },
    } as unknown as AsyncListService<Quote, string>),
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
        get: (key: keyof AsyncListContext<Quote, string>) => this.context()[key],
        set: this.setContext,
      },
      event,
      prop: (key: keyof AsyncListProps<Quote, string>) => this.props[key],
      refs: {
        get: (key: keyof typeof this.refs) => this.refs[key],
        set: <K extends keyof typeof this.refs>(key: K, value: (typeof this.refs)[K]) => {
          this.refs[key] = value
        },
      },
      send: (nextEvent: Record<string, unknown>) => this.handleEvent(nextEvent),
    }
  }

  private readonly setContext = <K extends keyof AsyncListContext<Quote, string>>(
    key: K,
    value:
      | AsyncListContext<Quote, string>[K]
      | ((previous: AsyncListContext<Quote, string>[K]) => AsyncListContext<Quote, string>[K]),
  ): void => {
    this.context.update((context) => ({
      ...context,
      [key]: typeof value === 'function' ? value(context[key]) : value,
    }))
  }
}
