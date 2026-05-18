import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkHoverCardContext } from './use-hover-card-context'

@Directive({
  selector: '[arkHoverCardArrow]',
  standalone: true,
  exportAs: 'arkHoverCardArrow',
})
export class ArkHoverCardArrow {
  constructor() {
    const context = injectArkHoverCardContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getArrowProps(),
    })
  }
}
