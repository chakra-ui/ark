import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkNavigationMenuContext } from './use-navigation-menu-context'
import { injectArkNavigationMenuItemContext } from './use-navigation-menu-item-context'

@Directive({
  selector: '[arkNavigationMenuItemIndicator]',
  standalone: true,
  exportAs: 'arkNavigationMenuItemIndicator',
})
export class ArkNavigationMenuItemIndicator {
  constructor() {
    const context = injectArkNavigationMenuContext()
    const item = injectArkNavigationMenuItemContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        context.api().getItemIndicatorProps({
          value: item.value(),
          disabled: item.disabled(),
        }),
    })
  }
}
