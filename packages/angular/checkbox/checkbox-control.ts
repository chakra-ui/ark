import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkCheckboxContext } from './use-checkbox-context'

@Directive({
  selector: '[arkCheckboxControl]',
  standalone: true,
  exportAs: 'arkCheckboxControl',
})
export class ArkCheckboxControl {
  constructor() {
    const context = injectArkCheckboxContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getControlProps(),
    })
  }
}
