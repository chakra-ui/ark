import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkToastContext } from './use-toast-context'

@Directive({
  selector: '[arkToastTitle]',
  standalone: true,
  exportAs: 'arkToastTitle',
})
export class ArkToastTitle {
  constructor() {
    const context = injectArkToastContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getTitleProps(),
    })
  }
}
