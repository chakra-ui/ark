import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_MENU_CONTEXT } from './use-menu-context'
import { injectArkMenuContext } from './use-menu-context'

/**
 * Nested-submenu trigger item. The directive must live inside a child menu's
 * `[arkMenu]` root that is itself a descendant of a parent `[arkMenu]` root.
 * The parent menu's `getTriggerItemProps(childApi)` is applied so clicking or
 * hovering this element opens the child submenu while leaving the parent open.
 */
@Directive({
  selector: '[arkMenuTriggerItem]',
  standalone: true,
  exportAs: 'arkMenuTriggerItem',
})
export class ArkMenuTriggerItem {
  constructor() {
    const childContext = injectArkMenuContext()
    const parentContext = inject(ARK_MENU_CONTEXT, { skipSelf: true })
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => parentContext.api().getTriggerItemProps(childContext.api()),
    })
  }
}
