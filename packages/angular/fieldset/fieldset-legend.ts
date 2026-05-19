import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFieldsetContext } from './use-fieldset-context'

@Directive({
  selector: '[arkFieldsetLegend]',
  standalone: true,
  exportAs: 'arkFieldsetLegend',
})
export class ArkFieldsetLegend {
  constructor() {
    const context = injectArkFieldsetContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.getLegendProps(),
    })
  }
}
