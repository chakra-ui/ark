import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkDateInputContext } from './use-date-input-context'

@Directive({
  selector: '[arkDateInputControl]',
  standalone: true,
  exportAs: 'arkDateInputControl',
})
export class ArkDateInputControl {
  constructor() {
    const context = injectArkDateInputContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getControlProps(),
    })
  }
}
