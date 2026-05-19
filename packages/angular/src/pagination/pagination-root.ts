import type * as pagination from '@zag-js/pagination'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  forwardRef,
  inject,
  input,
  model,
  output,
  type InputSignal,
  type ModelSignal,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type {
  PaginationElementIds,
  PaginationIntlTranslations,
  PaginationPageChangeDetails,
  PaginationPageSizeChangeDetails,
  PaginationPageUrlDetails,
} from './pagination.types'
import { ARK_PAGINATION_CONTEXT } from './use-pagination-context'
import { usePagination, type UsePaginationReturn } from './use-pagination'

@Directive({
  selector: '[arkPagination]',
  standalone: true,
  exportAs: 'arkPagination',
  providers: [{ provide: ARK_PAGINATION_CONTEXT, useExisting: forwardRef(() => ArkPaginationRoot) }],
})
export class ArkPaginationRoot implements UsePaginationReturn {
  /** The unique identifier of the pagination. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the pagination elements. Useful for composition. */
  readonly ids: InputSignal<Partial<PaginationElementIds> | undefined> = input<
    Partial<PaginationElementIds> | undefined
  >(undefined)
  /** Total number of data items. */
  readonly count: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The controlled active page. */
  readonly page: ModelSignal<number | undefined> = model<number | undefined>(undefined)
  /** The initial active page when uncontrolled. */
  readonly defaultPage: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The controlled number of data items per page. */
  readonly pageSize: ModelSignal<number | undefined> = model<number | undefined>(undefined)
  /** The initial number of data items per page when uncontrolled. */
  readonly defaultPageSize: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** Number of pages to show beside active page. */
  readonly siblingCount: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** Number of pages to show at the beginning and end. */
  readonly boundaryCount: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The type of trigger elements to render. */
  readonly type: InputSignal<pagination.Props['type'] | undefined> = input<pagination.Props['type'] | undefined>(
    undefined,
  )
  /** Function to generate href attributes for pagination links. */
  readonly getPageUrl: InputSignal<((details: PaginationPageUrlDetails) => string) | undefined> = input<
    ((details: PaginationPageUrlDetails) => string) | undefined
  >(undefined)
  /** Localized strings for accessibility labels. */
  readonly translations: InputSignal<PaginationIntlTranslations | undefined> = input<
    PaginationIntlTranslations | undefined
  >(undefined)

  /** Emits details when the active page changes. */
  readonly pageDetailsChange: OutputEmitterRef<PaginationPageChangeDetails> = output<PaginationPageChangeDetails>()
  /** Emits details when the page size changes. */
  readonly pageSizeDetailsChange: OutputEmitterRef<PaginationPageSizeChangeDetails> =
    output<PaginationPageSizeChangeDetails>()

  private readonly machine = usePagination({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      count: this.count(),
      page: this.page(),
      defaultPage: this.defaultPage(),
      pageSize: this.pageSize(),
      defaultPageSize: this.defaultPageSize(),
      siblingCount: this.siblingCount(),
      boundaryCount: this.boundaryCount(),
      type: this.type(),
      getPageUrl: this.getPageUrl(),
      translations: this.translations(),
      onPageChange: (details) => {
        if (this.page() !== details.page) {
          this.page.set(details.page)
        }
        this.pageDetailsChange.emit(details)
      },
      onPageSizeChange: (details) => {
        if (this.pageSize() !== details.pageSize) {
          this.pageSize.set(details.pageSize)
        }
        this.pageSizeDetailsChange.emit(details)
      },
    }),
  })

  readonly state: Signal<pagination.Service['state']> = this.machine.state
  readonly api: Signal<pagination.Api> = this.machine.api
  readonly service: pagination.Service = this.machine.service
  readonly send: pagination.Service['send'] = this.machine.send

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}
