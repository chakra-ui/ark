import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkMenuContext } from './use-menu-context'
import { ARK_MENU_ITEM_GROUP_CONTEXT } from './use-menu-item-group-context'
import { ARK_MENU_RADIO_ITEM_GROUP_CONTEXT } from './use-menu-radio-item-group-context'

@Directive({
  selector: '[arkMenuItemGroupLabel]',
  standalone: true,
  exportAs: 'arkMenuItemGroupLabel',
})
export class ArkMenuItemGroupLabel {
  constructor() {
    const context = injectArkMenuContext()
    const itemGroup = inject(ARK_MENU_ITEM_GROUP_CONTEXT, { optional: true })
    const radioGroup = inject(ARK_MENU_RADIO_ITEM_GROUP_CONTEXT, { optional: true })

    const groupId = itemGroup?.id ?? radioGroup?.id

    if (!groupId) {
      throw new Error(
        '[arkMenuItemGroupLabel] requires a parent [arkMenuItemGroup] or [arkMenuRadioItemGroup] in the injection tree.',
      )
    }

    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemGroupLabelProps({ htmlFor: groupId() }),
    })
  }
}
