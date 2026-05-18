import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkHoverCardContext } from './use-hover-card-context'

@Directive({
  selector: '[arkHoverCardArrowTip]',
  standalone: true,
  exportAs: 'arkHoverCardArrowTip',
})
export class ArkHoverCardArrowTip {
  constructor() {
    const context = injectArkHoverCardContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getArrowTipProps(),
    })
  }
}
