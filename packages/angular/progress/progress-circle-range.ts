import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkProgressContext } from './use-progress-context'

@Directive({
  selector: 'circle[arkProgressCircleRange]',
  standalone: true,
  exportAs: 'arkProgressCircleRange',
})
export class ArkProgressCircleRange {
  constructor() {
    const context = injectArkProgressContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getCircleRangeProps(),
    })
  }
}
