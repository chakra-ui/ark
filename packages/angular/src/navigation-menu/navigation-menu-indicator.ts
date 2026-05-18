import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkNavigationMenuContext } from './use-navigation-menu-context'

@Directive({
  selector: '[arkNavigationMenuIndicator]',
  standalone: true,
  exportAs: 'arkNavigationMenuIndicator',
})
export class ArkNavigationMenuIndicator {
  constructor() {
    const context = injectArkNavigationMenuContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getIndicatorProps(),
    })
  }
}
