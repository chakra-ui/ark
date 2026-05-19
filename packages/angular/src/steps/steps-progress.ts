import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkStepsContext } from './use-steps-context'

@Directive({
  selector: '[arkStepsProgress]',
  standalone: true,
  exportAs: 'arkStepsProgress',
})
export class ArkStepsProgress {
  constructor() {
    const context = injectArkStepsContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getProgressProps(),
    })
  }
}
