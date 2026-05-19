import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkPaginationContext } from './use-pagination-context'

@Directive({
  selector: '[arkPaginationEllipsis]',
  standalone: true,
  exportAs: 'arkPaginationEllipsis',
})
export class ArkPaginationEllipsis {
  /** The ellipsis index in the rendered page range. */
  readonly index: InputSignal<number> = input.required<number>()

  constructor() {
    const pagination = injectArkPaginationContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => pagination.api().getEllipsisProps({ index: this.index() }),
    })
  }
}
