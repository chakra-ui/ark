import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  computed,
  forwardRef,
  inject,
  input,
  type InputSignal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { NavigationMenuViewportProps } from './navigation-menu.types'
import { injectArkNavigationMenuContext } from './use-navigation-menu-context'
import {
  ARK_NAVIGATION_MENU_VIEWPORT_CONTEXT,
  type ArkNavigationMenuViewportContext,
} from './use-navigation-menu-viewport-context'

@Directive({
  selector: '[arkNavigationMenuViewportPositioner]',
  standalone: true,
  exportAs: 'arkNavigationMenuViewportPositioner',
  providers: [
    {
      provide: ARK_NAVIGATION_MENU_VIEWPORT_CONTEXT,
      useFactory: (positioner: ArkNavigationMenuViewportPositioner) => positioner.getViewportContext(),
      deps: [forwardRef(() => ArkNavigationMenuViewportPositioner)],
    },
  ],
})
export class ArkNavigationMenuViewportPositioner {
  /** Alignment of the viewport positioner (controls `--viewport-x`/`--viewport-y`). */
  readonly align: InputSignal<NavigationMenuViewportProps['align']> =
    input<NavigationMenuViewportProps['align']>(undefined)

  private readonly viewportContext: ArkNavigationMenuViewportContext = {
    align: computed(() => this.align()),
  }

  constructor() {
    const context = injectArkNavigationMenuContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        context.api().getViewportPositionerProps({
          align: this.align(),
        }),
    })
  }

  /** @internal Exposed for descendant viewport directives via ARK_NAVIGATION_MENU_VIEWPORT_CONTEXT. */
  getViewportContext(): ArkNavigationMenuViewportContext {
    return this.viewportContext
  }
}
