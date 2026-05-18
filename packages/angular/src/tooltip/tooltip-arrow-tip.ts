import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkTooltipContext } from './use-tooltip-context'

@Directive({
  selector: '[arkTooltipArrowTip]',
  standalone: true,
  exportAs: 'arkTooltipArrowTip',
})
export class ArkTooltipArrowTip {
  constructor() {
    const context = injectArkTooltipContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getArrowTipProps(),
    })
  }
}
