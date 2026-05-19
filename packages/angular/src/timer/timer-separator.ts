import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkTimerContext } from './use-timer-context'

@Directive({
  selector: '[arkTimerSeparator]',
  standalone: true,
  exportAs: 'arkTimerSeparator',
})
export class ArkTimerSeparator {
  constructor() {
    const timer = injectArkTimerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => timer.api().getSeparatorProps(),
    })
  }
}
