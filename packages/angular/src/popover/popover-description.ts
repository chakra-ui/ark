import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkPopoverContext } from './use-popover-context'

@Directive({
  selector: '[arkPopoverDescription]',
  standalone: true,
  exportAs: 'arkPopoverDescription',
})
export class ArkPopoverDescription {
  constructor() {
    const context = injectArkPopoverContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getDescriptionProps(),
    })
  }
}
