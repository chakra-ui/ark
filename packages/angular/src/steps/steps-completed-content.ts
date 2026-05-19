import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkStepsContext } from './use-steps-context'

@Directive({
  selector: '[arkStepsCompletedContent]',
  standalone: true,
  exportAs: 'arkStepsCompletedContent',
})
export class ArkStepsCompletedContent {
  constructor() {
    const context = injectArkStepsContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getContentProps({ index: context.api().count }),
    })
  }
}
