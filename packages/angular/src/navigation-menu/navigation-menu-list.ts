import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkNavigationMenuContext } from './use-navigation-menu-context'

@Directive({
  selector: '[arkNavigationMenuList]',
  standalone: true,
  exportAs: 'arkNavigationMenuList',
})
export class ArkNavigationMenuList {
  constructor() {
    const context = injectArkNavigationMenuContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getListProps(),
    })
  }
}
