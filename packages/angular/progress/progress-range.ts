import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkProgressContext } from './use-progress-context'

@Directive({
  selector: '[arkProgressRange]',
  standalone: true,
  exportAs: 'arkProgressRange',
})
export class ArkProgressRange {
  constructor() {
    const context = injectArkProgressContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getRangeProps(),
    })
  }
}
