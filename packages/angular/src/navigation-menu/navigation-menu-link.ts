import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  inject,
  input,
  type InputSignal,
  type InputSignalWithTransform,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkNavigationMenuContext } from './use-navigation-menu-context'
import { ARK_NAVIGATION_MENU_ITEM_CONTEXT, type ArkNavigationMenuItemContext } from './use-navigation-menu-item-context'

@Directive({
  selector: '[arkNavigationMenuLink]',
  standalone: true,
  exportAs: 'arkNavigationMenuLink',
})
export class ArkNavigationMenuLink {
  /** The value of the item this link belongs to (defaults to ancestor item context). */
  readonly value: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** Whether the link is the current link. */
  readonly current: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to close the navigation menu when the link is clicked. */
  readonly closeOnClick: InputSignal<boolean | undefined> = input<boolean | undefined>(undefined)

  private readonly itemContext: ArkNavigationMenuItemContext | null = inject(ARK_NAVIGATION_MENU_ITEM_CONTEXT, {
    optional: true,
  })

  constructor() {
    const context = injectArkNavigationMenuContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => {
        const value = this.value() ?? this.itemContext?.value()
        if (value === undefined) {
          throw new Error(
            '[arkNavigationMenuLink] requires either a [value] input or an ancestor [arkNavigationMenuItem].',
          )
        }
        return context.api().getLinkProps({
          value,
          current: this.current(),
          closeOnClick: this.closeOnClick(),
        })
      },
    })
  }
}
