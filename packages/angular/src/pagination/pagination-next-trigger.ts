import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkPaginationContext } from './use-pagination-context'

@Directive({
  selector: '[arkPaginationNextTrigger]',
  standalone: true,
  exportAs: 'arkPaginationNextTrigger',
})
export class ArkPaginationNextTrigger {
  constructor() {
    const pagination = injectArkPaginationContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => pagination.api().getNextTriggerProps(),
    })
  }
}
