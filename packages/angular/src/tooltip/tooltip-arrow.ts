import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkTooltipContext } from './use-tooltip-context'

@Directive({
  selector: '[arkTooltipArrow]',
  standalone: true,
  exportAs: 'arkTooltipArrow',
})
export class ArkTooltipArrow {
  constructor() {
    const context = injectArkTooltipContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getArrowProps(),
    })
  }
}
