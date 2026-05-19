import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  computed,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type Signal,
} from '@angular/core'
import type * as pagination from '@zag-js/pagination'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_PAGINATION_CONTEXT } from './use-pagination-context'
import type { UsePaginationReturn } from './use-pagination'

@Directive({
  selector: '[arkPaginationRootProvider]',
  standalone: true,
  exportAs: 'arkPaginationRootProvider',
  providers: [{ provide: ARK_PAGINATION_CONTEXT, useExisting: forwardRef(() => ArkPaginationRootProvider) }],
})
export class ArkPaginationRootProvider implements UsePaginationReturn {
  /** The pagination machine returned by usePagination(). */
  readonly value: InputSignal<UsePaginationReturn> = input.required<UsePaginationReturn>()
  readonly state: Signal<pagination.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<pagination.Api> = computed(() => this.value().api())
  readonly send: pagination.Service['send'] = (event) => this.value().send(event)

  get service(): pagination.Service {
    return this.value().service
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}
