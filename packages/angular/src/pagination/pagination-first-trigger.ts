import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkPaginationContext } from './use-pagination-context'

@Directive({
  selector: '[arkPaginationFirstTrigger]',
  standalone: true,
  exportAs: 'arkPaginationFirstTrigger',
})
export class ArkPaginationFirstTrigger {
  constructor() {
    const pagination = injectArkPaginationContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => pagination.api().getFirstTriggerProps(),
    })
  }
}
