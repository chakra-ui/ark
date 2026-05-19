import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkTimerContext } from './use-timer-context'

@Directive({
  selector: '[arkTimerArea]',
  standalone: true,
  exportAs: 'arkTimerArea',
})
export class ArkTimerArea {
  constructor() {
    const timer = injectArkTimerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => timer.api().getAreaProps(),
    })
  }
}
