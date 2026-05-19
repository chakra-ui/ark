import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkPinInputContext } from './use-pin-input-context'

@Directive({
  selector: '[arkPinInputControl]',
  standalone: true,
  exportAs: 'arkPinInputControl',
})
export class ArkPinInputControl {
  constructor() {
    const context = injectArkPinInputContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getControlProps(),
    })
  }
}
