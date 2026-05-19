import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkPaginationContext } from './use-pagination-context'

@Directive({
  selector: '[arkPaginationItem]',
  standalone: true,
  exportAs: 'arkPaginationItem',
})
export class ArkPaginationItem {
  /** The page value this item represents. */
  readonly value: InputSignal<number> = input.required<number>()

  constructor() {
    const pagination = injectArkPaginationContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => pagination.api().getItemProps({ type: 'page', value: this.value() }),
    })
  }
}
