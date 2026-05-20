import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkSliderContext } from './use-slider-context'

@Directive({
  selector: '[arkSliderControl]',
  standalone: true,
  exportAs: 'arkSliderControl',
})
export class ArkSliderControl {
  constructor() {
    const context = injectArkSliderContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getControlProps(),
    })
  }
}
