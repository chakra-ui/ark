import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkPopoverContext } from './use-popover-context'

@Directive({
  selector: '[arkPopoverArrow]',
  standalone: true,
  exportAs: 'arkPopoverArrow',
})
export class ArkPopoverArrow {
  constructor() {
    const context = injectArkPopoverContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getArrowProps(),
    })
  }
}
