import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkPaginationContext } from './use-pagination-context'

@Directive({
  selector: '[arkPaginationPrevTrigger]',
  standalone: true,
  exportAs: 'arkPaginationPrevTrigger',
})
export class ArkPaginationPrevTrigger {
  constructor() {
    const pagination = injectArkPaginationContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => pagination.api().getPrevTriggerProps(),
    })
  }
}
