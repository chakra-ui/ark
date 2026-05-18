import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkNavigationMenuContext } from './use-navigation-menu-context'
import { injectArkNavigationMenuViewportContext } from './use-navigation-menu-viewport-context'

@Directive({
  selector: '[arkNavigationMenuViewport]',
  standalone: true,
  exportAs: 'arkNavigationMenuViewport',
})
export class ArkNavigationMenuViewport {
  constructor() {
    const context = injectArkNavigationMenuContext()
    const viewport = injectArkNavigationMenuViewportContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        context.api().getViewportProps({
          align: viewport.align(),
        }),
    })
  }
}
