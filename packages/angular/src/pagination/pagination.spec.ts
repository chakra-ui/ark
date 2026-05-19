import { ApplicationRef, Component, Injector, inject, runInInjectionContext, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  ARK_PAGINATION_CONTEXT,
  ArkPaginationContext,
  ArkPaginationEllipsis,
  ArkPaginationFirstTrigger,
  ArkPaginationItem,
  ArkPaginationLastTrigger,
  ArkPaginationNextTrigger,
  ArkPaginationPrevTrigger,
  ArkPaginationRoot,
  ArkPaginationRootProvider,
  injectArkPaginationContext,
  paginationAnatomy,
  usePagination,
  type PaginationApi,
  type PaginationContextTemplate,
  type PaginationElementIds,
  type PaginationEllipsisMachineProps,
  type PaginationIntlTranslations,
  type PaginationItemLabelDetails,
  type PaginationItemMachineProps,
  type PaginationMachine,
  type PaginationMachineProps,
  type PaginationPageChangeDetails,
  type PaginationPageSizeChangeDetails,
  type PaginationPageUrlDetails,
  type PaginationPages,
  type PaginationService,
  type UsePaginationOptions,
  type UsePaginationProps,
  type UsePaginationReturn,
} from '@ark-ui/angular/pagination'

type PaginationPublicTypeSmoke = [
  PaginationApi,
  PaginationContextTemplate,
  PaginationElementIds,
  PaginationEllipsisMachineProps,
  PaginationIntlTranslations,
  PaginationItemLabelDetails,
  PaginationItemMachineProps,
  PaginationMachine,
  PaginationMachineProps,
  PaginationPageChangeDetails,
  PaginationPageSizeChangeDetails,
  PaginationPageUrlDetails,
  PaginationPages,
  PaginationService,
  UsePaginationOptions,
  UsePaginationProps,
  UsePaginationReturn,
]

const flush = async (fixture: ReturnType<typeof TestBed.createComponent>) => {
  await TestBed.inject(ApplicationRef).whenStable()
  TestBed.tick()
  fixture.detectChanges()
  await Promise.resolve()
  fixture.detectChanges()
}

describe('@ark-ui/angular/pagination', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_PAGINATION_CONTEXT).toBe('object')
    expect(typeof injectArkPaginationContext).toBe('function')
    expect(typeof usePagination).toBe('function')
    expect(typeof paginationAnatomy).toBe('object')
    expect(ArkPaginationRoot).toBeDefined()
    expect(ArkPaginationRootProvider).toBeDefined()
    expect(ArkPaginationItem).toBeDefined()
    expect(ArkPaginationEllipsis).toBeDefined()
    expect(ArkPaginationPrevTrigger).toBeDefined()
    expect(ArkPaginationNextTrigger).toBeDefined()
    expect(ArkPaginationFirstTrigger).toBeDefined()
    expect(ArkPaginationLastTrigger).toBeDefined()
    expect(ArkPaginationContext).toBeDefined()
    expect(undefined as PaginationPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('usePagination({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const result = runInInjectionContext(fixture.componentRef.injector, () => usePagination({ context: () => ({}) }))
    const id = (result.api().getRootProps() as { id: unknown }).id as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/pagination::/)

    fixture.destroy()
  })

  it('applies page item and ellipsis attributes', async () => {
    @Component({
      standalone: true,
      imports: [ArkPaginationRoot, ArkPaginationItem, ArkPaginationEllipsis],
      template: `
        <nav arkPagination id="pager" [count]="100" [pageSize]="10" [page]="2">
          <button arkPaginationItem [value]="1">1</button>
          <button arkPaginationItem [value]="2">2</button>
          <span arkPaginationEllipsis [index]="3">...</span>
        </nav>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.nativeElement.querySelector('[data-scope="pagination"][data-part="root"]') as HTMLElement
    const items = fixture.nativeElement.querySelectorAll('[data-part="item"]') as NodeListOf<HTMLButtonElement>
    const ellipsis = fixture.nativeElement.querySelector('[data-part="ellipsis"]') as HTMLElement

    expect(root.id).toBe('pagination:pager')
    expect(items[0]?.getAttribute('data-index')).toBe('1')
    expect(items[0]?.getAttribute('type')).toBe('button')
    expect(items[0]?.getAttribute('aria-current')).toBeNull()
    expect(items[1]?.getAttribute('data-selected')).toBe('')
    expect(items[1]?.getAttribute('aria-current')).toBe('page')
    expect(items[1]?.getAttribute('aria-label')).toBe('page 2')
    expect(ellipsis.id).toBe('pagination:pager:ellipsis:3')

    fixture.destroy()
  })

  it('supports next, previous, first, and last triggers', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkPaginationRoot,
        ArkPaginationFirstTrigger,
        ArkPaginationPrevTrigger,
        ArkPaginationNextTrigger,
        ArkPaginationLastTrigger,
      ],
      template: `
        <nav arkPagination [count]="50" [pageSize]="10" [defaultPage]="3" #pagination="arkPagination">
          <button arkPaginationFirstTrigger>First</button>
          <button arkPaginationPrevTrigger>Prev</button>
          <button arkPaginationNextTrigger>Next</button>
          <button arkPaginationLastTrigger>Last</button>
        </nav>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkPaginationRoot)).injector.get(ArkPaginationRoot)
    const [first, prev, next, last] = Array.from(
      fixture.nativeElement.querySelectorAll('button'),
    ) as HTMLButtonElement[]

    expect(root.api().page).toBe(3)
    next.click()
    await flush(fixture)
    expect(root.api().page).toBe(4)
    prev.click()
    await flush(fixture)
    expect(root.api().page).toBe(3)
    first.click()
    await flush(fixture)
    expect(root.api().page).toBe(1)
    last.click()
    await flush(fixture)
    expect(root.api().page).toBe(5)

    fixture.destroy()
  })

  it('supports controlled [(page)] with one pageChange emission', async () => {
    @Component({
      standalone: true,
      imports: [ArkPaginationRoot, ArkPaginationNextTrigger],
      template: `
        <nav arkPagination [count]="50" [pageSize]="10" [(page)]="page" (pageChange)="changes.push($event)">
          <button arkPaginationNextTrigger>Next</button>
        </nav>
      `,
    })
    class Host {
      readonly page = signal<number | undefined>(2)
      readonly changes: Array<number | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const next = fixture.nativeElement.querySelector('button') as HTMLButtonElement
    next.click()
    await flush(fixture)

    expect(fixture.componentInstance.page()).toBe(3)
    expect(fixture.componentInstance.changes).toEqual([3])

    fixture.destroy()
  })

  it('updates derived state when count and page size change', async () => {
    @Component({
      standalone: true,
      imports: [ArkPaginationRoot],
      template: `
        <nav arkPagination [count]="count()" [(pageSize)]="pageSize" [page]="3"></nav>
      `,
    })
    class Host {
      readonly count = signal(100)
      readonly pageSize = signal<number | undefined>(10)
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkPaginationRoot)).injector.get(ArkPaginationRoot)
    expect(root.api().totalPages).toBe(10)
    expect(root.api().pageRange).toEqual({ start: 20, end: 30 })

    fixture.componentInstance.count.set(40)
    await flush(fixture)
    expect(root.api().totalPages).toBe(4)
    expect(root.api().pageRange).toEqual({ start: 20, end: 30 })

    fixture.componentInstance.pageSize.set(25)
    await flush(fixture)
    expect(root.api().totalPages).toBe(2)
    expect(root.api().page).toBe(1)
    expect(root.api().pageRange).toEqual({ start: 0, end: 25 })

    fixture.destroy()
  })

  it('disables boundary triggers on first and last pages', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkPaginationRoot,
        ArkPaginationFirstTrigger,
        ArkPaginationPrevTrigger,
        ArkPaginationNextTrigger,
        ArkPaginationLastTrigger,
      ],
      template: `
        <nav arkPagination [count]="20" [pageSize]="10" [(page)]="page">
          <button arkPaginationFirstTrigger>First</button>
          <button arkPaginationPrevTrigger>Prev</button>
          <button arkPaginationNextTrigger>Next</button>
          <button arkPaginationLastTrigger>Last</button>
        </nav>
      `,
    })
    class Host {
      readonly page = signal<number | undefined>(1)
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    let [first, prev, next, last] = Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLButtonElement[]
    expect(first.disabled).toBe(true)
    expect(prev.disabled).toBe(true)
    expect(next.disabled).toBe(false)
    expect(last.disabled).toBe(false)

    fixture.componentInstance.page.set(2)
    await flush(fixture)
    ;[first, prev, next, last] = Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLButtonElement[]
    expect(first.disabled).toBe(false)
    expect(prev.disabled).toBe(false)
    expect(next.disabled).toBe(true)
    expect(last.disabled).toBe(true)

    fixture.destroy()
  })

  it('supports root-provider behavior', async () => {
    @Component({
      standalone: true,
      imports: [ArkPaginationRootProvider, ArkPaginationItem, ArkPaginationNextTrigger],
      template: `
        <nav arkPaginationRootProvider [value]="pagination">
          <button arkPaginationItem [value]="1">1</button>
          <button arkPaginationItem [value]="2">2</button>
          <button arkPaginationNextTrigger>Next</button>
        </nav>
      `,
    })
    class Host {
      private readonly injector = inject(Injector)
      readonly pagination = runInInjectionContext(this.injector, () =>
        usePagination({ context: () => ({ count: 20, pageSize: 10 }) }),
      )
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const provider = fixture.debugElement
      .query(By.directive(ArkPaginationRootProvider))
      .injector.get(ArkPaginationRootProvider)
    const next = fixture.nativeElement.querySelector('[data-part="next-trigger"]') as HTMLButtonElement

    expect(provider.api().page).toBe(1)
    next.click()
    await flush(fixture)
    expect(provider.api().page).toBe(2)
    expect(fixture.nativeElement.querySelector('[aria-current="page"]')?.textContent.trim()).toBe('2')

    fixture.destroy()
  })

  it('supports link pagination with generated hrefs', async () => {
    @Component({
      standalone: true,
      imports: [ArkPaginationRoot, ArkPaginationItem, ArkPaginationPrevTrigger, ArkPaginationNextTrigger],
      template: `
        <nav arkPagination type="link" [count]="30" [pageSize]="10" [page]="2" [getPageUrl]="getPageUrl">
          <a arkPaginationPrevTrigger>Prev</a>
          <a arkPaginationItem [value]="1">1</a>
          <a arkPaginationItem [value]="2">2</a>
          <a arkPaginationItem [value]="3">3</a>
          <a arkPaginationNextTrigger>Next</a>
        </nav>
      `,
    })
    class Host {
      readonly getPageUrl = ({ page }: PaginationPageUrlDetails) => `/page=${page}`
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const links = Array.from(fixture.nativeElement.querySelectorAll('a')) as HTMLAnchorElement[]

    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/page=1',
      '/page=1',
      '/page=2',
      '/page=3',
      '/page=3',
    ])
    expect(links[2]?.getAttribute('aria-current')).toBe('page')

    fixture.destroy()
  })
})
