import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkStepsContext } from './use-steps-context'

@Directive({
  selector: '[arkStepsNextTrigger]',
  standalone: true,
  exportAs: 'arkStepsNextTrigger',
})
export class ArkStepsNextTrigger {
  constructor() {
    const context = injectArkStepsContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getNextTriggerProps(),
    })
  }
}
