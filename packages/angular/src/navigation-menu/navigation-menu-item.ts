import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  computed,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type InputSignalWithTransform,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkNavigationMenuContext } from './use-navigation-menu-context'
import { ARK_NAVIGATION_MENU_ITEM_CONTEXT, type ArkNavigationMenuItemContext } from './use-navigation-menu-item-context'

@Directive({
  selector: '[arkNavigationMenuItem]',
  standalone: true,
  exportAs: 'arkNavigationMenuItem',
  providers: [
    {
      provide: ARK_NAVIGATION_MENU_ITEM_CONTEXT,
      useFactory: (item: ArkNavigationMenuItem) => item.getItemContext(),
      deps: [forwardRef(() => ArkNavigationMenuItem)],
    },
  ],
})
export class ArkNavigationMenuItem {
  /** The unique value of the navigation menu item. */
  readonly value: InputSignal<string> = input.required<string>()
  /** Whether the navigation menu item is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })

  private readonly itemContext: ArkNavigationMenuItemContext = {
    value: computed(() => this.value()),
    disabled: computed(() => this.disabled()),
  }

  constructor() {
    const context = injectArkNavigationMenuContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        context.api().getItemProps({
          value: this.value(),
          disabled: this.disabled(),
        }),
    })
  }

  /** @internal Exposed for item-scoped descendant directives via ARK_NAVIGATION_MENU_ITEM_CONTEXT. */
  getItemContext(): ArkNavigationMenuItemContext {
    return this.itemContext
  }
}
