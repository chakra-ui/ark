import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkCollapsibleContext } from './use-collapsible-context'

@Directive({
  selector: '[arkCollapsibleIndicator]',
  standalone: true,
  exportAs: 'arkCollapsibleIndicator',
})
export class ArkCollapsibleIndicator {
  constructor() {
    const context = injectArkCollapsibleContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getIndicatorProps(),
    })
  }
}
