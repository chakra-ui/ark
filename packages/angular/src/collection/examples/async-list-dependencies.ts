import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { asyncListExampleStyles } from '../async-list-example-styles'
import { type AsyncListProps, type AsyncListService, connectAsyncList, createAsyncListMachine } from '../public-api'

const LIMIT = 5

interface User {
  id: number
  name: string
  email: string
  department: string
  role: string
}

type AsyncListState = 'idle' | 'loading' | 'sorting'

interface AsyncListContext<T, C> {
  items: T[]
  filterText: string
  cursor?: C | null
  sortDescriptor?: { column: keyof T; direction: 'ascending' | 'descending' }
  error?: Error
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const departments = ['Engineering', 'Marketing', 'Sales', 'Support']

const roles = [
  'Senior Developer',
  'Marketing Manager',
  'Frontend Developer',
  'Sales Representative',
  'DevOps Engineer',
  'Customer Success',
  'Content Creator',
  'Backend Developer',
  'Account Manager',
  'Technical Support',
  'Brand Manager',
  'Full Stack Developer',
  'Sales Director',
  'Support Manager',
  'UI Designer',
  'Digital Marketer',
  'Mobile Developer',
  'Business Development',
  'Documentation Specialist',
  'Social Media Manager',
]

const mockUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', department: 'Engineering', role: 'Senior Developer' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', department: 'Marketing', role: 'Marketing Manager' },
  { id: 3, name: 'Carol Davis', email: 'carol@example.com', department: 'Engineering', role: 'Frontend Developer' },
  { id: 4, name: 'David Wilson', email: 'david@example.com', department: 'Sales', role: 'Sales Representative' },
  { id: 5, name: 'Eva Brown', email: 'eva@example.com', department: 'Engineering', role: 'DevOps Engineer' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', department: 'Support', role: 'Customer Success' },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', department: 'Marketing', role: 'Content Creator' },
  { id: 8, name: 'Henry Taylor', email: 'henry@example.com', department: 'Engineering', role: 'Backend Developer' },
  { id: 9, name: 'Ivy Anderson', email: 'ivy@example.com', department: 'Sales', role: 'Account Manager' },
  { id: 10, name: 'Jack Thompson', email: 'jack@example.com', department: 'Support', role: 'Technical Support' },
  { id: 11, name: 'Kate Martinez', email: 'kate@example.com', department: 'Marketing', role: 'Brand Manager' },
  { id: 12, name: 'Liam Garcia', email: 'liam@example.com', department: 'Engineering', role: 'Full Stack Developer' },
  { id: 13, name: 'Mia Rodriguez', email: 'mia@example.com', department: 'Sales', role: 'Sales Director' },
  { id: 14, name: 'Noah Lopez', email: 'noah@example.com', department: 'Support', role: 'Support Manager' },
  { id: 15, name: 'Olivia White', email: 'olivia@example.com', department: 'Engineering', role: 'UI Designer' },
  { id: 16, name: 'Paul Harris', email: 'paul@example.com', department: 'Marketing', role: 'Digital Marketer' },
  { id: 17, name: 'Quinn Clark', email: 'quinn@example.com', department: 'Engineering', role: 'Mobile Developer' },
  { id: 18, name: 'Ruby Lewis', email: 'ruby@example.com', department: 'Sales', role: 'Business Development' },
  { id: 19, name: 'Sam Young', email: 'sam@example.com', department: 'Support', role: 'Documentation Specialist' },
  { id: 20, name: 'Tina Walker', email: 'tina@example.com', department: 'Marketing', role: 'Social Media Manager' },
]

@Component({
  selector: 'collection-async-list-dependencies-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="root">
      <div class="header">
        <select class="select" [value]="selectedDepartment()" (change)="selectDepartment($event)">
          <option value="">All Departments</option>
          @for (department of departments; track department) {
            <option [value]="department">{{ department }}</option>
          }
        </select>

        <select class="select" [value]="selectedRole()" (change)="selectRole($event)">
          <option value="">All Roles</option>
          @for (role of roles; track role) {
            <option [value]="role">{{ role }}</option>
          }
        </select>

        <input class="input" type="text" placeholder="Search..." [value]="api().filterText" (input)="search($event)" />

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

      <div class="status">Found {{ api().items.length }} users</div>

      <div class="item-group">
        @for (user of api().items; track user.id) {
          <div class="item">
            <div class="item-content">
              <div class="item-title">{{ user.name }}</div>
              <div class="item-description">{{ user.email }}</div>
              <div class="item-meta">{{ user.department }} &bull; {{ user.role }}</div>
            </div>
          </div>
        }
      </div>

      @if (api().empty && !api().loading) {
        <div class="empty">No users found with current filters</div>
      }
    </div>
  `,
  styles: [asyncListExampleStyles],
})
export class CollectionAsyncListDependenciesExample {
  protected readonly departments = departments
  protected readonly roles = roles
  protected readonly selectedDepartment = signal('')
  protected readonly selectedRole = signal('')

  private readonly refs = { abort: null as AbortController | null, seq: 0 }
  private readonly state = signal<AsyncListState>('idle')
  private readonly context = signal<AsyncListContext<User, undefined>>({
    items: mockUsers.slice(0, LIMIT),
    filterText: '',
    cursor: null,
  })

  private readonly props: AsyncListProps<User, undefined> = {
    initialItems: mockUsers.slice(0, LIMIT),
    dependencies: [this.selectedDepartment(), this.selectedRole()],
    load: async ({ filterText }) => {
      await delay(400)

      let items = mockUsers

      if (this.selectedDepartment()) {
        items = items.filter((user) => user.department === this.selectedDepartment())
      }

      if (this.selectedRole()) {
        items = items.filter((user) => user.role === this.selectedRole())
      }

      if (filterText) {
        items = items.filter(
          (user) =>
            user.name.toLowerCase().includes(filterText.toLowerCase()) ||
            user.email.toLowerCase().includes(filterText.toLowerCase()),
        )
      }

      return { items: items.slice(0, LIMIT) }
    },
  }

  protected readonly api = computed(() =>
    connectAsyncList({
      context: { get: (key: keyof AsyncListContext<User, undefined>) => this.context()[key] },
      send: (event: Record<string, unknown>) => this.handleEvent(event),
      state: { matches: (...values: string[]) => values.includes(this.state()) },
    } as unknown as AsyncListService<User, undefined>),
  )

  protected selectDepartment(event: Event): void {
    this.selectedDepartment.set((event.target as HTMLSelectElement).value)
    this.api().reload()
  }

  protected selectRole(event: Event): void {
    this.selectedRole.set((event.target as HTMLSelectElement).value)
    this.api().reload()
  }

  protected search(event: Event): void {
    this.api().setFilterText((event.target as HTMLInputElement).value)
  }

  private handleEvent(event: Record<string, unknown>): void {
    if (event['type'] === 'RELOAD') {
      this.state.set('loading')
      this.runAction('clearItems', event)
      this.runAction('performFetch', event)
      return
    }

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
        get: (key: keyof AsyncListContext<User, undefined>) => this.context()[key],
        set: this.setContext,
      },
      event,
      prop: (key: keyof AsyncListProps<User, undefined>) =>
        key === 'dependencies' ? [this.selectedDepartment(), this.selectedRole()] : this.props[key],
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
