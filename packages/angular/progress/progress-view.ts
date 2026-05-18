import { DestroyRef, Directive, ElementRef, Renderer2, type InputSignal, inject, input } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { ProgressViewProps } from './progress.types'
import { injectArkProgressContext } from './use-progress-context'

@Directive({
  selector: '[arkProgressView]',
  standalone: true,
  exportAs: 'arkProgressView',
})
export class ArkProgressView {
  readonly state: InputSignal<ProgressViewProps['state']> = input.required<ProgressViewProps['state']>()

  constructor() {
    const context = injectArkProgressContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getViewProps({ state: this.state() }),
    })
  }
}
