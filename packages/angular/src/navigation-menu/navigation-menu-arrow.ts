import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkNavigationMenuContext } from './use-navigation-menu-context'
import { ARK_NAVIGATION_MENU_ITEM_CONTEXT } from './use-navigation-menu-item-context'

@Directive({
  selector: '[arkNavigationMenuArrow]',
  standalone: true,
  exportAs: 'arkNavigationMenuArrow',
})
export class ArkNavigationMenuArrow {
  private readonly itemContext = inject(ARK_NAVIGATION_MENU_ITEM_CONTEXT, { optional: true })

  constructor() {
    const context = injectArkNavigationMenuContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => {
        const value = this.itemContext?.value()
        if (value != null) {
          return context.api().getArrowProps({ value })
        }
        return context.api().getArrowProps()
      },
    })
  }
}
