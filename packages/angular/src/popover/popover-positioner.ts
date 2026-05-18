import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkPopoverContext } from './use-popover-context'

@Directive({
  selector: '[arkPopoverPositioner]',
  standalone: true,
  exportAs: 'arkPopoverPositioner',
})
export class ArkPopoverPositioner {
  constructor() {
    const context = injectArkPopoverContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getPositionerProps(),
    })
  }
}
