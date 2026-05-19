import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkToastContext } from './use-toast-context'

@Directive({
  selector: '[arkToastDescription]',
  standalone: true,
  exportAs: 'arkToastDescription',
})
export class ArkToastDescription {
  constructor() {
    const context = injectArkToastContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getDescriptionProps(),
    })
  }
}
