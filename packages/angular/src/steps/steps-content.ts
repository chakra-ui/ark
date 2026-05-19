import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkStepsContext } from './use-steps-context'

@Directive({
  selector: '[arkStepsContent]',
  standalone: true,
  exportAs: 'arkStepsContent',
})
export class ArkStepsContent {
  /** The zero-based step index for this content panel. */
  readonly index: InputSignal<number> = input.required<number>()

  constructor() {
    const context = injectArkStepsContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getContentProps({ index: this.index() }),
    })
  }
}
