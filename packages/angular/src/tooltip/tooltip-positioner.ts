import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkTooltipContext } from './use-tooltip-context'

@Directive({
  selector: '[arkTooltipPositioner]',
  standalone: true,
  exportAs: 'arkTooltipPositioner',
})
export class ArkTooltipPositioner {
  constructor() {
    const context = injectArkTooltipContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getPositionerProps(),
    })
  }
}
