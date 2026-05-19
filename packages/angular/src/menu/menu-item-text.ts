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
import { injectArkMenuContext } from './use-menu-context'
import { ARK_MENU_ITEM_CONTEXT } from './use-menu-item-context'

@Directive({
  selector: '[arkMenuItemText]',
  standalone: true,
  exportAs: 'arkMenuItemText',
})
export class ArkMenuItemText {
  /** The value of the parent menu item this text belongs to. */
  readonly value: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** Whether the parent menu item is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The textual value of the parent menu item. */
  readonly valueText: InputSignal<string | undefined> = input<string | undefined>(undefined)

  constructor() {
    const context = injectArkMenuContext()
    const item = inject(ARK_MENU_ITEM_CONTEXT, { optional: true })
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        context.api().getItemTextProps({
          value: item?.value() ?? this.value() ?? '',
          disabled: item?.disabled() ?? this.disabled(),
          valueText: item?.valueText() ?? this.valueText(),
          ...(item?.checked() !== undefined ? { checked: item.checked() } : {}),
        }),
    })
  }
}
