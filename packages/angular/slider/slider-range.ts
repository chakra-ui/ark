import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkSliderContext } from './use-slider-context'

@Directive({
  selector: '[arkSliderRange]',
  standalone: true,
  exportAs: 'arkSliderRange',
})
export class ArkSliderRange {
  constructor() {
    const context = injectArkSliderContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getRangeProps(),
    })
  }
}
