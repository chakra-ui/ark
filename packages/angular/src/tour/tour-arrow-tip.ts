import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkTourContext } from './use-tour-context'

@Directive({
  selector: '[arkTourArrowTip]',
  standalone: true,
  exportAs: 'arkTourArrowTip',
})
export class ArkTourArrowTip {
  constructor() {
    const tour = injectArkTourContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => tour.api().getArrowTipProps(),
    })
  }
}
